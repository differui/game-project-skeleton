import { bindAll } from './helpers';

export default class Canvas {
  /**
   * original x
   */
  public ox: number = 0;

  /**
   * original y
   */
  public oy: number = 0;

  /**
   * mouse x
   */
  public mx: number = 0;

  /**
   * mouse y
   */
  public my: number = 0;

  /**
   * width
   */
  public w: number = 0;

  /**
   * height
   */
  public h: number = 0;

  /**
   * canvas
   */
  public ca: HTMLCanvasElement;

  /**
   * canvas context
   */
  public ct: CanvasRenderingContext2D;

  constructor(w: number, h: number) {
    const canvas: HTMLCanvasElement = document.createElement('canvas');

    this.ca = canvas;
    this.ct = this.ca.getContext('2d');
    this.resize(w, h);

    bindAll(
      this,
      'handleMouseDown',
      'handleMouseUp',
      'handleMouseMove',
      'handleResize'
    );
    this.ca.addEventListener('mousedown', this.handleMouseDown);
    this.ca.addEventListener('resize', this.handleResize);
  }

  private handleMouseDown(ev: MouseEvent) {
    this.ca.addEventListener('mouseup', this.handleMouseUp);
    this.ca.addEventListener('mousemove', this.handleMouseMove);
  }

  private handleMouseUp(ev: MouseEvent) {
    this.ca.removeEventListener('mouseup', this.handleMouseUp);
    this.ca.removeEventListener('mousemove', this.handleMouseMove);
  }

  private handleMouseMove(ev: MouseEvent) {
    this.mx = ev.clientX;
    this.my = ev.clientY;
  }

  private handleResize() {
    const documentElement = document.documentElement;

    this.resize(documentElement.clientWidth, documentElement.clientHeight);
  }

  public resize(w: number, h: number) {
    this.w = w;
    this.h = h;
    this.ox = this.w / 2;
    this.oy = this.h / 2;
    this.ca.width = this.w * devicePixelRatio;
    this.ca.height = this.h * devicePixelRatio;
    this.ca.style.width = `${this.w}px`;
    this.ca.style.height = `${this.h}px`;
    this.ca.style.top = '0';
    this.ca.style.left = '0';
    this.ca.style.position = 'absolute';
    this.ct.scale(devicePixelRatio, devicePixelRatio);
  }

  public clear() {
    this.ct.fillRect(0, 0, this.w, this.h);
  }

  public mount(containerSelector: string = 'body') {
    const containerNode = document.querySelector(containerSelector) || document.body;

    containerNode.appendChild(this.ca);
  }
}
