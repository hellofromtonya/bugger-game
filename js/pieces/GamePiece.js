'use strict';

class GamePiece {
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
  constructor({row = 0, col = 0, startingPosition = {x: null, y: null}, speed = 100, sprite = ''} = {}) {
    if (sprite) {
      this.setSprite(`images/${sprite}`);
    }
    this.size = {
      w: gameConfig.gamePiece.w,
      h: gameConfig.gamePiece.h
    };
    this.speed = speed;

    this.insertionMidPt = {
      x: this.size.w / 2,
      y: this.size.h / 2 - 40
    };

    this.startingPosition = {

      x: !startingPosition.hasOwnProperty('x') || startingPosition.x === null
          ? col * gameConfig.space.w - gameConfig.space.mid.x - this.insertionMidPt.x
          : startingPosition.x,

      y: !startingPosition.hasOwnProperty('y') || startingPosition.y === null
          ? row * gameConfig.space.h - gameConfig.space.mid.y - this.insertionMidPt.y
          : startingPosition.y
    };

    this.coords = {
      x: this.startingPosition.x,
      y: this.startingPosition.y
    };

    this._location = this.getLocation();
    this._points = 0;
  }

  /**
   * @description Gets the location on the board.
   * @param {boolean} useCache When true, returns the cached location.
   * @returns {{row: number, col: number}}
   *
   * @method
   */
  getLocation(useCache = false) {
    if (!useCache) {
      this.updateLocation();
    }

    return this._location;
  }

  /**
   * @description Updates the location on the board.
   *
   * @method
   */
  updateLocation() {
    this._location = {
      row: this.getRowLocation(),
      col: this.getColLocation()
    }
  }

  /**
   * @description Get the game piece's row
   * @returns {number}
   *
   * @method
   */
  getRowLocation() {
    return Math.min(Math.ceil(this.coords.y / gameConfig.space.h) + 1, gameConfig.rows);
  }

  /**
   * @description Get the game piece's column
   * @returns {number}
   *
   * @method
   */
  getColLocation() {
    return Math.min(Math.ceil(this.coords.x / gameConfig.space.w) + 1, gameConfig.columns);
  }

  /*****************************
   * Game Board Positioning
   ****************************/

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
    this.updateLocation();
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

  /*****************************
   * Scoring
   ****************************/

  /**
   * @description Set the points for this game piece. Used for
   *              game scoring.
   * @param {number} points
   */
  setPoints(points) {
    this._points = points;
  }

  /**
   * @description Get the points for this game piece.
   * @param {number} points
   */
  getPoints() {
    return this._points;
  }
}