'use strict';

class Player extends GamePiece {
  /**
   * @description Player constructor
   * @param {number} row Row number of where to put the player
   * @param {number} col Column number of where to put the player
   * @param {string} sprite Player's character image
   * @constructor
   */
  constructor({row = 5, col = 3} = {}) {
    super({row, col});

    this.allowedKeys = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
    };

    this._score = 0;
  }

  /*****************************
   * Move Handlers
   ****************************/

  /**
   * @description Checks if the keyboard input is a valid move command
   * @param {number} keyCode Keyboard code
   * @returns {boolean}
   *
   * @method
   */
  isValidMoveCommand(keyCode) {
    return this.allowedKeys.hasOwnProperty(keyCode);
  }

  /**
   * @description Handles the move command.
   * @param {number} keyCode Keyboard code
   * @returns {boolean}
   *
   * @method
   */
  handleInput(keyCode) {
    switch (this.allowedKeys[keyCode]) {
      case 'left':
        this.coords.x = Math.max(this.coords.x - gameConfig.space.w, gameConfig.boundLimits.left);
        break;
      case 'up':
        this.coords.y = Math.max(this.coords.y - gameConfig.space.h, gameConfig.boundLimits.up);
        break;
      case 'right':
        this.coords.x = Math.min(this.coords.x + gameConfig.space.w, gameConfig.boundLimits.right);
        break;
      case 'down':
        this.coords.y = Math.min(this.coords.y + gameConfig.space.h, gameConfig.boundLimits.down);
        break;
    }

    this.updateLocation();
  }

  /**
   * Checks if the player has won, meaning this player is in the water.
   * @returns {boolean}
   *
   * @method
   */
  hasWon() {
    return this.getLocation(true).row === 1;
  }

  /*****************************
   * Scoring
   ****************************/

  /**
   * @description Add points to the player's score.
   * @param {number} points Number of points to add to the player's score.
   *              (Can be negative)
   */
  addScore(points = 0) {
    this._score += points;
  }

  /**
   * @description Get the player's score.
   * @return {number}
   *
   * @method
   */
  getScore() {
    return this._score;
  }
}