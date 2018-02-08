import Collider from './Collider';
import { Boundary } from './settings';
import Rect from './colliders/Rect';

export default abstract class Component {
  static RPA = Math.PI / 180; // radius per angle
  static APR = 180 / Math.PI; // angle per radius

  /**
   * origin x
   */
  public x: number = 0;

  /**
   * origin y
   */
  public y: number = 0;

  /**
   * width
   */
  public w: number = 0;

  /**
   * height
   */
  public h: number = 0;

  /**
   * rotation angle
   */
  public r: number = 0;

  /**
   * velocity x
   */
  public vx: number = 0;

  /**
   * velocity y
   */
  public vy: number = 0;

  /**
   * velocity rotation
   */
  public vr: number = 0;

  /**
   * acceleration x
   */
  public ax: number = 0;

  /**
   * acceleration y
   */
  public ay: number = 0;

  /**
   * acceleration rotation
   */
  public ar: number = 0;

  /**
   * translate x
   */
  public tx: number = 0;

  /**
   * translate y
   */
  public ty: number = 0;

  /**
   * scale x
   */
  public sx: number = 1;

  /**
   * scale y
   */
  public sy: number = 1;

  /**
   * boundary x
   */
  public bdx: number = 0;

  /**
   * boundary y
   */
  public bdy: number = 0;

  /**
   * boundary width
   */
  public bdw: number = 0;

  /**
   * boundary height
   */
  public bdh: number = 0;

  /**
   * bounce x
   */
  public bnx: number = -1;

  /**
   * bounce y
   */
  public bny: number = -1;

  /**
   * mass
   */
  public m: number = 1;

  /**
   * friction
   */
  public f: number = 1;

  /**
   * gravity
   */
  public g: number = 0;

  /**
   * tag
   */
  public t: string = '';

  /**
   * image
   */
  public i: HTMLImageElement;

  public get collider(): Collider {
    return new Rect(
      this.x,
      this.y,
      this.w,
      this.h
    );
  }

  public get boundary(): Boundary {
    if (
      this.x < this.bdx - this.w ||
      this.x > this.bdw + this.w ||
      this.y < this.bdy - this.h ||
      this.y > this.bdh + this.h
    ) {
      return Boundary.OUTSIDE;
    }
    if (this.x === this.bdx - this.w) {
      return Boundary.LEFT;
    }
    if (this.x === this.bdw + this.w) {
      return Boundary.RIGHT;
    }
    if (this.y === this.bdy - this.h) {
      return Boundary.TOP;
    }
    if (this.y === this.bdh + this.h) {
      return Boundary.BOTTOM;
    }
    return Boundary.INSIDE;
  }

  public calcRotation() {
    this.vr += this.ar;
    this.vr *= this.f;
    this.r += this.vr;
  }

  public calcPosition() {
    this.ay += this.g;
    this.vx += this.ax;
    this.vy += this.ay;
    this.vx *= this.f;
    this.vy *= this.f;
    this.x += this.vx;
    this.y += this.vy;
  }

  public abstract calcBoundary(): void;

  public useTag(t: string = this.t) {
    this.t = t;
  }

  public useGravity(g: number = this.g) {
    this.g = g;
  }

  public useFriction(f: number = this.f) {
    this.f = f;
  }

  public useBounce(bnx: number = this.bnx, bny: number = this.bny) {
    this.bnx = bnx;
    this.bny = bny;
  }

  public useBoundary(bdx: number, bdy: number, bdw: number, bdh: number) {
    this.bdx = bdx;
    this.bdy = bdy;
    this.bdw = bdw;
    this.bdh = bdh;
  }

  public calc() {
    this.calcPosition();
    this.calcRotation();
    this.calcBoundary();
  }

  public draw(ct: CanvasRenderingContext2D) {
    ct.drawImage(
      this.i,
      this.x,
      this.y,
      this.w,
      this.h
    );
  }

  public clear(ct: CanvasRenderingContext2D) {
    ct.clearRect(
      this.x,
      this.y,
      this.w,
      this.h
    );
  }
}
