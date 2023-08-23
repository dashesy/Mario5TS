import { Keys } from './types';

function keydownHandler(ev: KeyboardEvent) {
  if (keys.handler(ev.key, true) == true) {
    return true
  }
  ev.preventDefault();
  return false
}

function keyupHandler(ev: KeyboardEvent) {
  if (keys.handler(ev.key, false) == true) {
    return true
  }
  ev.preventDefault();
  return false
}

export const keys: Keys = {
  bind() {
    document.addEventListener('keydown', keydownHandler);
    document.addEventListener('keyup', keyupHandler);
  },
  reset() {
    keys.left = false;
    keys.right = false;
    keys.accelerate = false;
    keys.up = false;
    keys.down = false;
  },
  unbind() {
    document.removeEventListener('keydown', keydownHandler);
    document.removeEventListener('keyup', keyupHandler);
  },
  handler(key: string, status: boolean) {
    switch (key) {
      case 'Control': //CTRL on MAC
      case 'A': //A
        keys.accelerate = status;
        break;
      case 'ArrowDown': //DOWN ARROW
        keys.down = status;
        break;
      case 'ArrowRight': //RIGHT ARROW
        keys.right = status;
        break;
      case 'ArrowLeft': //LEFT ARROW
        keys.left = status;
        break;
      case 'ArrowUp': //UP ARROW
        keys.up = status;
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
