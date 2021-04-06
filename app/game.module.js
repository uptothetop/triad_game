import Render from './render.module.js';
import Utils from './utils.module.js';

export default class Game {
  constructor(canvasElementId) {
    this.canvasElement = document.getElementById(canvasElementId);
    this.renderer = new Render(this.canvasElement);
    this.utils = new Utils(3, 3, 3, 3);

    this.selection = [];
    this.cards = [];
    this.message = '';
    this.loading = true;

    this.cardAspect = 1.5;
    this.cardWidth = 100;
    this.cardHeight = this.cardWidth * this.cardAspect;

    this.renderer.cardWidth = this.cardWidth;
    this.renderer.cardHeight = this.cardHeight;
    this.renderer.cardAspect = this.cardAspect;
  }

  start() {
    const generated = this.utils.generateCards()
    this.cards = generated[0];
    this.cardsIndexes = generated[1];
    this.calculateCardsPositions();

    this.drawCards();

    // Add Event Listeners
    this.canvasElement.addEventListener('click', (event) => {
      this.clickedElement(event.pageX, event.pageY);
    }, false);
  }

  /** Refreshes the playing field */
  drawCards() {
    this.renderer.clear();
    for (let i in this.cardsPositions) {
      const selected = this.selection.indexOf(i - 0) > -1;
      this.drawCard(i, this.cards[i], selected);
    }
  }

  /** Draws exact card on exact place */
  drawCard(index, card, selected = false) {
    const coords = this.cardsPositions[index];
    this.renderer.drawCard(coords[0], coords[1], ...card, selected);
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

  /** Removes the card */
  removeCard(index) {
    //TODO: Implement me
  }

  /** Checks if the selected combination is correct. */
  isTriad() {
    let score = 0;
    for (let i = 0; i < this.selection[0].length; i++) {
      score += +this.checkTriple(i);
    }

    return score === 4;
  }

  /** Returns element that clicked */
  clickedElement(clickX, clickY) {
    const cardIndex = this.cardsPositions.findIndex(card => (clickX >= card[0] && clickY >= card[1] && clickX <= card[2] && clickY <= card[3]));

    // No card is clicked
    if (cardIndex === -1) { return false; }

    const selIndex = this.selection.indexOf(cardIndex);

    if (selIndex > -1) {
      this.selection.splice(selIndex, 1);
    } else {
      if (this.selection.length < 3) {
        this.selection.push(cardIndex);

        if(this.selection.length === 3) {
          const isTriad = this.isTriad();

          console.log({isTriad});
        }
      }
    }

    // Redraw cards
    this.drawCards();
  }

  /** "Calculates" coordinates for the set of cards.  */
  calculateCardsPositions() {
    // It was calculated, but now it's just cached
    const cachedCoords = [
        [50,  50, 150, 200 ],
        [175, 50, 275, 200 ],
        [300, 50, 400, 200 ],
        [425, 50, 525, 200 ],
        [50, 225, 150, 375 ],
        [175, 225, 275, 375 ],
        [300, 225, 400, 375 ],
        [425, 225, 525, 375 ],
        [50, 400, 150, 550 ],
        [175, 400, 275, 550 ],
        [300, 400, 400, 550 ],
        [425, 400, 525, 550 ]
    ];

    // const x = [];
    // cachedCoords.forEach(coord => {
    //   const prep = [
    //     coord[0],
    //     coord[1],
    //     coord[0] + this.cardWidth,
    //     coord[1] + this.cardHeight,
    //   ];
    //   x.push(prep);
    // });
    // console.log([x]);
    this.cardsPositions = cachedCoords;
  }
}
