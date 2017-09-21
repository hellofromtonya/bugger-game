'use strict';

class Enemy extends GamePiece {
  /**
   * @description Instantiate a Game Piece
   * @param {number} row game board row
   * @param {number} col game board column
   * @param {object} startingPosition Starting x,y position on the game board
   * @param {number} speed Game Piece's speed
   * @param {string} sprite Game Piece's 'image.png'
   *
   * @constructor
   */
  constructor({row = 0, col = 0, startingPosition = {x: null, y: null}, speed = 200, sprite = 'enemy-bug.png'} = {}) {
    super({row, col, startingPosition, speed, sprite});
  }

  /**
   * @description Get the game piece's column
   * @returns {number}
   *
   * @method
   */
  getColLocation() {
    return Math.min(Math.ceil(this.coords.x / gameConfig.space.w), gameConfig.columns);
  }

}