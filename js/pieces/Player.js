'use strict';

class Player extends GamePiece {
  /**
   * @description Player constructor
   * @param {object} coords {X, y} coordinates on the game board
   * @param {string} sprite Player's character image
   * @constructor
   */
  constructor({row = 5} = {}) {
    super({row});

    this.startingPosition.x = gameConfig.dims.w / 2 - this.insertionMidPt.x;
    this.coords.x = this.startingPosition.x;
    this.allowedKeys = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
    };

    this._score = 0;
    this._level = 1;
  }

  /**
   * @description Checks if the keyboard input is a valid move command
   * @param {number} keyCode Keyboard code
   * @returns {boolean}
   */
  isValidMoveCommand(keyCode) {
    return this.allowedKeys.hasOwnProperty(keyCode);
  }

  /**
   * @description Handles the move command.
   * @param {number} keyCode Keyboard code
   * @returns {boolean}
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
  }

  /**
   * @description Tallies the Player's Game Statistics
   *
   * @param {Boolean} skipLevelUp When true, skips the level up checker
   * @returns {{score: (number|*), levelingUp, level: number}}
   *
   * @method
   */
  tallyGameStats(skipLevelUp = false) {
    const canLevelUp = !skipLevelUp ? this.canLevelUp() : false;

    if (canLevelUp) {
      this._level++;
    }

    return {
      score: this._score,
      leveledUp: canLevelUp,
      level: this._level
    };
  }

  update(dt = 0) {
    // this.checkWon();
  }

  won() {
    return this.coords.y <= gameConfig.boundLimits.up;
  }

  /**
   * @description Checks if the player can level up
   *
   * @returns {boolean}
   *
   * @method
   */
  canLevelUp() {
    // return this._score >= this._levelUpRules.score;
  }

  resetStats() {

  }
}