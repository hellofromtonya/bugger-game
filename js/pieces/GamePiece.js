'use strict';

class GamePiece {
  constructor({row = 4, speed = 50, sprite = ''} = {}) {
    if (sprite) {
      this.setSprite(`images/${sprite}`);
    }
    this.size = {
      w: 101,
      h: 171
    };

    this.insertionMidPt = {
      x: this.size.w / 2,
      y: 171 / 2 - 40
    };

    this.startingPosition = {
      x: gameConfig.space.h / 2 - this.insertionMidPt.x,
      y: row * gameConfig.space.h - gameConfig.space.mid.x - this.insertionMidPt.y
    };

    this.speed = speed;
    this.coords = {
      x: this.startingPosition.x,
      y: this.startingPosition.y
    };
  }

  update(dt = 0) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

  }

  render(ctx) {
    ctx.drawImage(
        Resources.get(this.sprite),
        this.coords.x,
        this.coords.y
    );
  }

  reset() {
    this.coords.x = this.startingPosition.x;
    this.coords.y = this.startingPosition.y;
  }

  /**
   *
   * @param newSprite
   * @method
   */
  setSprite(newSprite) {
    this.sprite = newSprite;

    if ( ! Resources.get(this.sprite)) {
      Resources.load(newSprite);
    }
  }
}