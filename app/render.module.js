/** Class that renders game. */
export default class Render {
  constructor(canvasElementId) {
    this.context = document.getElementById(canvasElementId).getContext('2d');

    //TODO: Calculate card size
    this.cardSize = 100; // Card is 1:2, e.g. Y=2X
    this.aspectY = 2;
    this.margin = 20;
  }

  drawRect(startX, startY) {
    this.context.fillRect(startX, startY, this.cardSize, this.cardSize * this.aspectY);
  }

  draw(cardsSet) {
    cardsSet.forEach(element => {
      // const node = document.createNo
      // this.canvas.appendChild()
    });
  }
}