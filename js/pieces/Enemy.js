'use strict';

class Enemy extends GamePiece {
    constructor({row = 4, speed = 50, sprite = 'enemy-bug.png'} = {}) {
        super({row, speed, sprite});
    }

    update(dt = 0) {
        let newX = this.coords.x + (gameConfig.space.w * dt);

        this.coords.x = newX < (gameConfig.boundLimits.right + this.size.w)
            ? newX
            : - this.size.w;
    }
}