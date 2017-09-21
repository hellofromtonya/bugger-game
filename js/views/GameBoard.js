'use strict';

class GameBoard {
  /**
   * @description Instantiate the game board
   * @param {number} boardWidth Canvas width
   * @param {number} boardHeight Canvas height
   * @param {number} rows Number of rows on the game board
   * @param {number} columns Number of columns on the game board
   *
   * @method
   */
  constructor({boardWidth = 606, boardHeight = 606, rows = 6, columns = 5} = {}) {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.canvas.width = boardWidth;
    this.canvas.height = boardHeight;
    this._rows = rows;
    this._columns = columns;

    document.getElementsByClassName('game-board-container')[0].appendChild(this.canvas);

    this.elements = {
      score: document.getElementsByClassName('score')[0],
    }
  }

  reset() {

  }

  render() {
    /* This array holds the relative URL to the image used
     * for that particular row of the game level.
     */
    const rowImages = [
      'images/water-block.png',   // Top row is water
      'images/stone-block.png',   // Row 1 of 3 of stone
      'images/stone-block.png',   // Row 2 of 3 of stone
      'images/stone-block.png',   // Row 3 of 3 of stone
      'images/grass-block.png',   // Row 1 of 2 of grass
      'images/grass-block.png'    // Row 2 of 2 of grass
    ];

    /* Loop through the number of rows and columns we've defined above
     * and, using the rowImages array, draw the correct image for that
     * portion of the "grid"
     */
    for (let row = 0; row < this._rows; row++) {
      for (let col = 0; col < this._columns; col++) {
        /* The drawImage function of the canvas' context element
         * requires 3 parameters: the image to draw, the x coordinate
         * to start drawing and the y coordinate to start drawing.
         * We're using our Resources helpers to refer to our images
         * so that we get the benefits of caching these images, since
         * we're using them over and over.
         */
        this.ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
      }
    }
  }

  /**
   * @description Update the player's score.
   *
   * @method
   */
  updateScore(score) {
    this.elements.score.innerHTML = score;
  };
}