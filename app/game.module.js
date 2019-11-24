import Render from './render.module.js';
import Utils from './utils.module.js';

export default class Game {
  constructor(canvasElementId) {
    this.renderer = new Render(canvasElementId);
    this.utils = new Utils(3, 3, 3, 3);

    this.selection = [];
    this.cards = [];
    this.message = '';
    this.loading = true;
  }

  start() {
    this.renderer.drawCard(50, 50, 100, 1 / 1.5, 0, 0, 0, 0);
    this.renderer.drawCard(175, 50, 100, 1 / 1.5, 1, 0, 0, 0);
    this.renderer.drawCard(300, 50, 100, 1 / 1.5, 2, 0, 0, 0);
    this.renderer.drawCard(425, 50, 100, 1 / 1.5, 2, 0, 0, 0);

    this.renderer.drawCard(50, 225, 100, 1 / 1.5, 0, 0, 0, 1);
    this.renderer.drawCard(175, 225, 100, 1 / 1.5, 1, 1, 0, 1);
    this.renderer.drawCard(300, 225, 100, 1 / 1.5, 2, 2, 0, 1);
    this.renderer.drawCard(425, 225, 100, 1 / 1.5, 2, 2, 0, 1);

    this.renderer.drawCard(50, 400, 100, 1 / 1.5, 0, 0, 0, 2);
    this.renderer.drawCard(175, 400, 100, 1 / 1.5, 1, 1, 0, 2);
    this.renderer.drawCard(300, 400, 100, 1 / 1.5, 2, 2, 0, 2);
    this.renderer.drawCard(425, 400, 100, 1 / 1.5, 2, 2, 0, 2);
  }

  /** Checks if given triple is valid triad */
  checkTriple(i) {
    const elements = new Set([
      this.selection[0][i],
      this.selection[1][i],
      this.selection[2][i],
    ]);

    return elements.size === 3 || elements.size === 1;
  }

  /** Checks if the selected combination is correct. */
  isTriad() {
    let score = 0;
    for (let i = 0; i < this.selection[0].length; i++) {
      score += +this.checkTriple(i);
    }

    return score === 4;
  }
}
