import Collider from '../Collider';

export default class Circle extends Collider {
  /**
   * radius
   */
  radius: number;

  constructor(x: number, y: number, radius: number) {
    super();

    this.x = x;
    this.y = y;
    this.radius = radius;
  }
}
