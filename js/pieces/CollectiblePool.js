'use strict';

/**
 * @description Collectible Pool Handler
 *
 * Collection of gems for the player to collect
 * during the game.
 */
class CollectiblePool extends GamePiecePool {
  /**
   * @description Instantiate the pool.
   * @param gameBoardCTX
   *
   * @constructor
   */
  constructor(gameBoardCTX) {
    super(gameBoardCTX);

    this._images = [
      'gem-blue.png',
      'gem-green.png',
      'gem-orange.png',
    ];
  }

  /**
   * @description Create a game piece.
   * @param {number} poolIndex Index in the enemy pool
   * @return {GamePiece|boolean}
   *
   * @method Private
   */
  _createGamePiece(poolIndex) {
    if (poolIndex > this._images.length) {
      return false;
    }

    const coords = this.generateUniqueCoords();

    const gamePiece = new GamePiece({
      row: coords.y,
      col: coords.x,
      speed: 0,
      sprite: this._images[poolIndex - 1]
    });

    gamePiece.startingPosition.y -= 25;
    gamePiece.coords.y = gamePiece.startingPosition.y;
    gamePiece.setPoints(1000);

    return gamePiece;
  }
}