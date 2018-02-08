import Collider from '../Collider';

export default class Rect extends Collider {
  /**
   * width
   */
  w: number;

  /**
   * height
   */
  h: number;

  constructor(x: number, y: number, w: number, h: number) {
    super();

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
}
