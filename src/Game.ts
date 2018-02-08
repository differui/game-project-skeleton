import Repository from './Repository';
import Keyboard from './Keyboard';
import Renderer from './Renderer';
import Canvas from './Canvas';
import Ball from './components/Ball';
import { KEYCODE, Boundary } from './settings';

const documentElement = document.documentElement;

export default class Game {
  private rp: Repository = new Repository();
  private kb: Keyboard = new Keyboard();
  private rd: Renderer = new Renderer();

  /**
   * canvas
   */
  private ca: Canvas = new Canvas(documentElement.clientWidth, documentElement.clientHeight);

  /**
   * ball
   */
  private ball: Ball = new Ball(0, 0, 30);

  constructor() {
    this.ca.mount();

    // ball
    this.ball.x = this.ca.ox;
    this.ball.y = this.ca.oy;
    this.ball.useGravity(0.1);
    this.ball.useFriction(0.97);
    this.ball.useBounce(-1, 0.8);
    this.ball.useBoundary(0, 0, this.ca.w, this.ca.h);
  }

  private renderBall() {
    this.ball.clear(this.ca.ct);
    if (this.ball.boundary !== Boundary.INSIDE && this.ball.boundary !== Boundary.OUTSIDE) {
      if (this.kb.isKeyDown(KEYCODE.LEFT_ARROW)) {
        this.ball.roll(-2);
      } else if (this.kb.isKeyDown(KEYCODE.RIGHT_ARROW)) {
        this.ball.roll(2);
      }
      if (this.kb.isKeyDown(KEYCODE.SPACE)) {
        this.ball.jump(0.7);
      }
    }
    this.ball.calc();
    this.ball.draw(this.ca.ct);
  }

  private async load() {
    await Promise.all([
      this.rp.loadImage('ball', '/assets/ball.png'),
    ]);
  }

  public async init() {
    await this.load();

    // ball
    this.ball.i = this.rp.images.ball;

    // play
    this.rd.render(() => {
      this.renderBall();
      return true;
    });
  }
}
