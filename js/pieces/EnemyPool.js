'use strict';

class EnemyPool {
  /**
   *
   * @param gameBoardCTX
   */
  constructor(gameBoardCTX) {
    this._gameBoardCTX = gameBoardCTX;
    this._pool = [];
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
   * @description Create our pool of enemies.
   * @param {number} numberEnemies The number of enemies to create
   *
   * @method
   */
  create(numberEnemies = 5) {
    for (let i = 1; i <= numberEnemies; i++) {
      let enemy = new GamePiece({
        row: this.constructor.generateRandom(4, 2),
        startingPosition: {
          x: this.constructor.generateRandom(gameConfig.boundLimits.right, 1, true) * this.constructor.generateRandom(10, 1)
        },
        speed: 200,
        sprite: 'enemy-bug.png'
      });

      // Vary the speed on the odd number ones
      // just to make it more challenging.
      if (i % 2 !== 0) {
        enemy.speed *= this.constructor.generateRandom(3, 1.5, true);
      }
      this._pool.push(enemy);
    }
  }

  /**
   * @description Render each of the enemies in this pool.
   *
   * @method
   */
  render() {
    this._pool.forEach(enemy => enemy.render(this._gameBoardCTX));
  }

  /**
   * @description Reset each enemy in this pool.
   *
   * @method
   */
  reset() {
    this._pool = [];
  }

  /**
   * @description Update enemy positions on the game board.
   * @param {number} dt Time delta
   *
   * @method
   */
  update(dt = 0.0) {
    this._pool.forEach(enemy => enemy.update(dt));
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
    const randomNumber = Math.random() * (max - min + 1) + min;

    if (returnFloating === true) {
      return Math.fround(randomNumber);
    }

    return Math.floor(randomNumber);
  }
}