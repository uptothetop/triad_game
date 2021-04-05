/** Class that renders game. */
export default class Render {
  constructor(canvasElement) {
    this.context = canvasElement.getContext('2d');

    //TODO: Calculate card size
    this.cardSize = 100; // Card is 1:2, e.g. Y=2X
    this.margin = 20;

    this.offsets = {
      0: [0],
      1: [-.5, .5],
      2: [-1, 0, 1],
    };

    // Cache pattern canvas
    this.patternCanvas = document.createElement('canvas');
    this.patternCanvas.width = 1;
    this.patternCanvas.height = 4;
    this.patternContext = this.patternCanvas.getContext('2d');
  }

  /** Sets new color for current context */
  set fill(newColor) {
    this.context.fillStyle = newColor;
  }

  /** Sets border style for the current context */
  set borderColor(color) {
    this.context.strokeStyle = color;
  }

  /** Sets the border width for the current context */
  set borderWidth(width) {
    this.context.lineWidth = width;
  }

  set patternColor(color) {
    this.patternContext.fillStyle = color;
    this.patternContext.fillRect(0, 0, 2, 2);
  }

  /** Clears the screen */
  clear() {
    this.context.clearRect(0, 0, this.patternCanvas.width, this.patternCanvas.height);
  }

  // Drawings

  /** Draws a rect */
  rect(x, y, wx, wy) {
    this.context.fillRect(x, y, wx, wy);
    this.context.rect(x, y, wx, wy);
    this.context.stroke();
  }

  /** Draws a circle */
  circle(x, y, r) {
    this.context.beginPath();
    this.context.arc(x, y, r, 0, 2 * Math.PI);
    this.context.stroke();
    this.context.fill();
  }

  /** Draws a triangle */
  triangle(x, y, s) {
    this.context.beginPath();
    this.context.moveTo(x, y + s);

    this.context.lineTo(x + s, y + s);
    this.context.lineTo(x + s / 2, y);
    this.context.closePath();

    this.context.stroke();
    this.context.fill();
  }

  /** Draws card */
  drawCard(x, y, type, color, num, fill, selected) {
    // Draw card body
    this.fill = '#eee';
    // FIXME: borderColor shares the color
    // this.borderColor = (selected) ? '#f00' : '#000';
    this.borderColor = '#000';
    this.borderWidth = 1;
    this.rect(x, y, this.cardWidth, this.cardHeight);

    // Calculate positions for the figures

    // This will be definitely refactored
    const centerX = this.cardWidth / 2;
    const figureSize = this.cardHeight / 3.5;
    const centerY = this.cardHeight / 2;

    let offset = 0;
    const padding = 5;

    // Implement color logic
    const colors = ['#58D68D', '#A93226', '#3498DB'];
    const selectedColor = colors[color];
    // this.borderColor = selectedColor;

    // Implement Fill logic
    this.borderWidth = 0;
    switch (fill) {
      case 0:
        this.fill = '#fff';
        break;
      case 1:
        this.fill = selectedColor;
        break;
      default:
        this.patternColor = selectedColor;
        const pattern = this.context.createPattern(this.patternCanvas, 'repeat');
        this.context.fillStyle = pattern;
    }

    for (let i = 0; i <= num; i++) {
      const mul = this.offsets[num][i];

      offset = mul * figureSize;
      // console.log({num, i, mul, offset});

      // Draw figure
      switch (type) {
        case 0:
          this.triangle(x + centerX - figureSize / 2, y  + centerY - figureSize / 2 + offset, figureSize - padding);
          break;
        case 1:
          const r = figureSize / 2;
          this.circle(x + centerX, y + centerY + offset, r - padding);
          break;
        case 2:
          this.rect(x + centerX - figureSize / 2, y + centerY - figureSize / 2 + offset, figureSize - padding, figureSize - padding);
          break;
        default:
          break;
      }
    }

    return {x, y, xw: x + this.cardWidth, yh: y + this.cardHeight}
  }
}
