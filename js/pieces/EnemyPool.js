'use strict';

/**
 * @description Enemy Pool Handler
 *
 * The enemy pool handles the collection of enemies including:
 *
 * 1. Creating the enemies with random positioning and speed.
 * 2. Updating each enemy.
 * 3. Rendering (drawing) each enemy on the game board.
 * 4. Resetting.
 */
class EnemyPool extends GamePiecePool {
  /**
   * @description Instantiate the enemy pool.
   * @param gameBoardCTX
   *
   * @constructor
   */
  constructor(gameBoardCTX) {
    super(gameBoardCTX);
  }

  /**
   * @description Create an enemy.
   * @param {number} poolIndex Index in the enemy pool
   * @return {GamePiece}
   *
   * @method Private
   */
  _createGamePiece(poolIndex) {
    const enemy = new Enemy({
      row: this.constructor.generateRandom(4, 2),
      startingPosition: {
        x: this.constructor.generateRandom(gameConfig.boundLimits.right, 1, true) * this.constructor.generateRandom(10, 1)
      }
    });

    // Vary the speed on the odd number ones
    // just to make it more challenging.
    if (poolIndex % 2 !== 0) {
      enemy.speed *= this.constructor.generateRandom(3, 1.5, true);
    }

    return enemy;
  }


}