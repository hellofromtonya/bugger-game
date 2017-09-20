class GameBoard {
  constructor() {

    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.canvas.width = 505;
    this.canvas.height = 606;

    document.getElementsByClassName('game-board-container')[0].appendChild(this.canvas);

    /* Go ahead and load all of the images we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these images are properly loaded our game will start.
     */
    Resources.load([
      'images/stone-block.png',
      'images/water-block.png',
      'images/grass-block.png',
    ]);
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
    const numRows = 6;
    const numCols = 5;

    /* Loop through the number of rows and columns we've defined above
     * and, using the rowImages array, draw the correct image for that
     * portion of the "grid"
     */
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
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
}