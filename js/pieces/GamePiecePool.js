'use strict';

/**
 * @description Game Piece Pool Handler
 *
 * Handles the collection of game pieces including:
 *
 * 1. Creating the game pieces.
 * 2. Updating each one.
 * 3. Rendering (drawing) each on the game board.
 * 4. Resetting.
 */
class GamePiecePool {

  /**
   * @description Instantiate the game piece pool.
   * @param gameBoardCTX
   *
   * @constructor
   */
  constructor(gameBoardCTX) {
    this._gameBoardCTX = gameBoardCTX;
    this._pool = [];
    this._uniqueCoords = [];
  }

  /**
   * @description Pool Iterator - allowing enemies to be traversed (iterated).
   * @returns {{next: (function(): {value: *, done: boolean})}}
   *
   * @method
   */
  [Symbol.iterator]() {
    let index = -1;

    return {
      next: () => ({
        value: this._pool[++index],
        done: !(index in this._pool)
      })
    };
  };

  /**
   * @description Create the pool of game pieces.
   * @param {number} qty The number of gamePieces to create
   *
   * @method
   */
  create(qty = 3) {
    for (let poolIndex = 1; poolIndex <= qty; poolIndex++) {
      const gamePiece = this._createGamePiece(poolIndex);
      if (typeof gamePiece === 'object') {
        this._pool.push(gamePiece);
      }
    }
  }

  /**
   * @description Create a game piece.
   * @param {number} poolIndex Index in the enemy pool
   * @return {GamePiece}
   *
   * @method Private
   */
  _createGamePiece(poolIndex) {
    // You'll want to use this method as abstract and build your own.
    const gamePiece = new GamePiece();

    return gamePiece;
  }

  /**
   * @description Deletes (removes) the game piece from the pool.
   * @param gamePiece
   *
   * @method
   */
  delete(gamePiece) {
    const index = this._pool.indexOf(gamePiece);

    this._pool.splice(index, 1);
  }

  /**
   * @description Render each of the game piece in this pool.
   *
   * @method
   */
  render() {
    this._pool.forEach(gamePiece => gamePiece.render(this._gameBoardCTX));
  }

  /**
   * @description Reset the pool, removing the reference to the game pieces.
   *
   * @method
   */
  reset() {
    this._pool = [];
  }

  /**
   * @description Update game pieces' positions on the game board.
   * @param {number} dt Time delta
   *
   * @method
   */
  update(dt = 0.0) {
    this._pool.forEach(gamePiece => gamePiece.update(dt));
  }

  /**
   * @description Generate unique coordinates.
   * @param {{max: number, min: number}} rowRange Range of rows
   * @param {{max: number, min: number}} columnRange Range of columns
   * @returns {{x: number, y: number}}
   *
   * @method
   */
  generateUniqueCoords(rowRange = {max: 4, min: 2}, columnRange = {max: 6, min: 1}) {
    let coords = {x:0, y:0};

    while (true) {
      coords = {
        x: this.constructor.generateRandom(columnRange.max, columnRange.min),
        y: this.constructor.generateRandom(rowRange.max, rowRange.min)
      };

      for (const uniqueCoords of this._uniqueCoords) {
        if (uniqueCoords.x === coords.x &&
            uniqueCoords.y === coords.y) {
          continue;
        }
      }

      break;
    }

    this._uniqueCoords.push(coords);
    return coords;
  }

  /**
   * @description Generate a random number.
   * @param {number} max Upper limit (largest number)
   * @param {number} min Lower limit (smallest number)
   * @param {boolean} returnFloating When true, returns a floating point number
   * @returns {number}
   *
   * @method
   */
  static generateRandom(max, min, returnFloating = false) {
    const randomNumber = Math.random() * (max - min + 1);

    return returnFloating === true
        ? randomNumber + min
        : Math.floor(randomNumber) + min;
  }
}