import Component from '../Component';
import Circle from '../colliders/Circle';
import { Boundary } from '../settings';

export default class Ball extends Component {
  /**
   * radius
   */
  public radius: number;

  /**
   * image
   */
  public image: HTMLImageElement;

  constructor(x: number, y: number, radius: number) {
    super();

    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  public get collider() {
    return new Circle(
      this.x,
      this.y,
      this.radius
    );
  }

  public get boundary(): Boundary {
    if (this.x - this.radius <= this.bdx) {
      return Boundary.LEFT;
    }
    if (this.x + this.radius >= this.bdw) {
      return Boundary.RIGHT;
    }
    if (this.y - this.radius <= this.bdy) {
      return Boundary.TOP;
    }
    if (this.y + this.radius >= this.bdh) {
      return Boundary.BOTTOM;
    }
    return Boundary.INSIDE;
  }

  public calcBoundary() {
    if (this.x - this.radius < this.bdx) {
      this.x = this.bdx + this.radius;
      this.vx *= -this.bnx;
    }
    if (this.x + this.radius > this.bdw) {
      this.x = this.bdw - this.radius;
      this.vx *= -this.bnx;
    }
    if (this.y - this.radius < this.bdy) {
      this.y = this.bdy + this.radius;
      this.vy *= -this.bny;
    }
    if (this.y + this.radius > this.bdh) {
      this.y = this.bdh - this.radius;
      this.vy *= -this.bny;
    }
  }

  public roll(angle: number) {
    this.vr += angle * Component.RPA;
    this.vx = this.vr * this.radius; // angle velocity to line velocity
  }

  public jump(motion: number = 1) {
    this.ay = 0;
    this.vy = -this.radius * motion;
  }

  public draw(ct: CanvasRenderingContext2D) {
    ct.save();
    ct.translate(this.x, this.y);
    ct.rotate(this.r);
    ct.scale(this.sx, this.sy);
    ct.translate(-this.x, -this.y);
    ct.drawImage(
      this.i,
      this.x - this.radius,
      this.y - this.radius,
      this.radius * 2,
      this.radius * 2
    );
    ct.restore();
  }

  public clear(ct: CanvasRenderingContext2D) {
    ct.clearRect(
      0,
      0,
      this.bdw,
      this.bdh
    );
  }
}
