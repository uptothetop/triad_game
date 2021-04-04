/** Utils for the Game, which are not related to logic */

export default class Utils {
  constructor(types, nums, colors, fills) {
    this.types = types;
    this.nums = nums;
    this.colors = colors;
    this.fills = fills;
    this.stackLength = this.types * this.nums * this.colors * this.fills;
  }

  /** Generates cards set and returns it shuffled. */
  generateCards() {
    const cache = [];
    const maxEl = this.stackLength - 1;
    let index = 0;

    // Create array of Randomized indexes
    const indexes = Array.from(Array(this.stackLength).keys())
      .sort(() => Math.random() - .5);

    let cur = 0;

    for (let i = 0; i < this.types; i++) {
      for (let j = 0; j < this.colors; j++) {
        for (let k = 0; k < this.nums; k++) {
          for (let l = 0; l < this.fills; l++) {
            // Get random index
            index = indexes[cur];
            cache[index] = [i, j, k, l];
            cur++;
          }
        }
      }
    }

    return [cache, indexes];
  }
}
