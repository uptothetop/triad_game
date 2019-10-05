/** Utils for the Game, which are not related to logic */

export default class Utils {
  constructor(types, nums, colors, fills) {
    this.types = types;
    this.nums = nums;
    this.colors = colors;
    this.fills = fills;
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

}