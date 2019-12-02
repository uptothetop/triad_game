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
    this.cards = this.utils.generateCards();
    this.calculateCardsPositions();

    for (let i in this.cardsPositions) {
      this.drawCard(i, this.cards[i]);
    }
  }

  /** Draws exact card on exact place */
  drawCard(index, card) {
    const coords = this.cardsPositions[index];
    this.renderer.drawCard(...coords, 100, 1 / 1.5, ...card);
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

  /** "Calculates" coordinates for the set of cards.  */
  calculateCardsPositions() {
    // It was calculated, but now it's just cached
    const cachedCoords = [
      [50, 50],
      [175, 50],
      [300, 50],
      [425, 50],
      [50, 225],
      [175, 225],
      [300, 225],
      [425, 225],
      [50, 400],
      [175, 400],
      [300, 400],
      [425, 400],
    ];
    this.cardsPositions = cachedCoords;
  }
}
