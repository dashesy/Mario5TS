import { Keys } from './types';

function keydownHandler(ev: KeyboardEvent) {
  if (instrument.handler(ev.key, true) == true) {
    return true
  }
  ev.preventDefault();
  return false
}

export const instrument: Keys = {
  bind() {
    document.addEventListener('keydown', keydownHandler);
  },
  reset() {
    instrument.left = false;
    instrument.right = false;
    instrument.accelerate = false;
    instrument.up = false;
    instrument.down = false;
  },
  unbind() {
    document.removeEventListener('keydown', keydownHandler);
  },
  handler(key: string, status: boolean) {
    switch (key) {
      case 'ArrowRight': //RIGHT ARROW
        instrument.left = false
        instrument.right = status;
        instrument.up = false
        break;
      case 'ArrowLeft': //LEFT ARROW
        instrument.left = status;
        instrument.right = false
        instrument.up = false
        break;
      case 'ArrowUp': //UP ARROW
        instrument.left = false;
        instrument.right = false
        instrument.up = status;
        break;
      case 'H': //Left+Up
        instrument.left = status;
        instrument.right = false
        instrument.up = status;
        break;
      case 'K': //Right+Up
        instrument.left = false;
        instrument.right = status
        instrument.up = status;
        break;
      case 'Q': //wait
        instrument.reset()
        break;
      default:
        return true;
    }

    return false;
  },
  accelerate: false,
  left: false,
  up: false,
  right: false,
  down: false,
};
