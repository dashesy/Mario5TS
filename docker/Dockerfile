FROM ubuntu:22.04

# Remove any third-party apt sources to avoid issues with expiring keys.
RUN rm -f /etc/apt/sources.list.d/*.list

ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get update &&\
    apt-get install -y sudo git bash unattended-upgrades
RUN unattended-upgrade

RUN apt-get update && apt-get install -y --no-install-recommends \
    wget \
    zip \
    ca-certificates \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# This is for cv2
RUN apt-get update && apt-get install -y libgl1 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /code
ENV PATH /code/miniconda/bin:${PATH}

# Create a non-root user and switch to it
RUN adduser --disabled-password --gecos '' --shell /bin/bash user \
 && chown -R user:user /code
RUN echo "user ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/90-user
USER user

# All users can use /home/user as their home directory
ENV HOME=/home/user
RUN chmod 777 /home/user

# Dependencies: conda
RUN wget --quiet https://repo.anaconda.com/miniconda/Miniconda3-py311_23.5.2-0-Linux-x86_64.sh -O ~/miniconda.sh --no-check-certificate && /bin/bash ~/miniconda.sh -b -p /code/miniconda
RUN rm ~/miniconda.sh
RUN conda clean -ya

RUN conda update -n base -c defaults conda
RUN conda create --name detic python=3.10 -y

USER root
RUN apt-get update && apt-get install -y --no-install-recommends \
    nodejs \
    npm \
    && rm -rf /var/lib/apt/lists/*
USER user
