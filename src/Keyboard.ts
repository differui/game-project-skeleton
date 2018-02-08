import { bindAll } from './helpers';
import { KEYCODE } from './settings';

export default class Keyboard {
  private map: Hash<boolean> = {};

  constructor() {
    bindAll(
      this,
      'handleKeyDown',
      'handleKeyUp'
    );
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
  }

  private handleKeyDown(ev: KeyboardEvent) {
    this.map[ev.keyCode || ev.charCode] = true;
  }

  private handleKeyUp(ev: KeyboardEvent) {
    this.map[ev.keyCode || ev.charCode] = false;
  }

  public isKeyDown(code: KEYCODE): boolean {
    return this.map[code];
  }

  public isKeyUp(code: KEYCODE): boolean {
    return !this.isKeyDown(code);
  }
}
