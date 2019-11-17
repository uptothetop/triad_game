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
    // this.cards = this.generateCards();
    this.renderer.drawRect(30, 30);
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
