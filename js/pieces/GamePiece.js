'use strict';

class GamePiece {
  /**
   * @description Instantiate a Game Piece
   * @param {number} row game board row
   * @param {object} startingPosition Starting x,y position on the game board
   * @param {number} speed Game Piece's speed
   * @param {string} sprite Game Piece's 'image.png'
   *
   * @constructor
   */
  constructor({row = 0, startingPosition = {x: null, y: null}, speed = 100, sprite = ''} = {}) {
    if (sprite) {
      this.setSprite(`images/${sprite}`);
    }
    this.size = {
      w: gameConfig.gamePiece.w,
      h: gameConfig.gamePiece.h
    };

    this.insertionMidPt = {
      x: this.size.w / 2,
      y: this.size.h / 2 - 40
    };

    // If no starting position was passed in, automatically calculate it.
    startingPosition.x = !startingPosition.hasOwnProperty('x') || startingPosition.x === null
        ? gameConfig.space.h / 2 - this.insertionMidPt.x
        : startingPosition.x;

    startingPosition.y = !startingPosition.hasOwnProperty('y') || startingPosition.y === null
        ? row * gameConfig.space.h - gameConfig.space.mid.x - this.insertionMidPt.y
        : startingPosition.y;

    this.startingPosition = startingPosition;
    this.speed = speed;
    this.coords = {
      x: this.startingPosition.x,
      y: this.startingPosition.y
    };
  }

  /**
   * @description Update the game piece's position on the board.
   * @param dt
   *
   * @method
   */
  update(dt = 0) {
    let newX = this.coords.x + dt * this.speed;

    this.coords.x = newX < (gameConfig.boundLimits.right + this.size.w)
        ? newX
        : -this.size.w;
  }

  /**
   * @description Draw the game piece on the board.
   * @param {object} ctx Game board's ctx
   *
   * @method
   */
  render(ctx) {
    ctx.drawImage(
        Resources.get(this.sprite),
        this.coords.x,
        this.coords.y
    );
  }

  /**
   * @description Reset to the starting position.
   *
   * @method
   */
  reset() {
    this.coords.x = this.startingPosition.x;
    this.coords.y = this.startingPosition.y;
  }

  /**
   * @description Set the new sprite image.
   * @param {string} newSprite 'path/to/image.png'
   * @param {object} callback
   *
   * @method
   */
  setSprite(newSprite, callback = {obj: {}, cb: {}}) {
    this.sprite = newSprite;
    Resources.load(newSprite);

    // If there's a callback, then wait for the sprite to be loaded
    // and then call the callback.
    if (typeof callback === 'object' && typeof callback.cb === 'function') {
      Resources.onReady(function() {
        callback.cb.call(callback.obj);
      });
    }
  }
}