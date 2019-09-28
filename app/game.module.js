export default class Game {
  constructor() {
    this.types = 3;
    this.colors = 3;
    this.nums = 3;
    this.fills = 3;

    this.cards = this.generateCards();
    this.selection = [];

    this.message = '';
    this.loading = true;
  }

  /** Generates cards set and returns it shuffled. */
  generateCards() {
    this.message = 'Generating cards...';
    this.loading = true;
    const cache = [];

    // I will cache this you know, I will refactor this laaateeeer
    for (let i = 0; i < this.types; i++) {
      for (let j = 0; j < this.colors; j++) {
        for (let k = 0; k < this.nums; k++) {
          for (let l = 0; l < this.fills; l++) {
            cache.push([i, j, k, l]);
          }
        }
      }
    }

    return this.shuffle(cache);
  }

  /** Shuffles the array */
  shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

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
