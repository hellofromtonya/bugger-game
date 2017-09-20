'use strict';

/**
 * Things that I need to add:
 *
 * 2. Scoring
 * 3. Leveling up
 * 4. Multiple enemies
 */

const gameConfig = {
  dims: {
    w: 505,
    h: 606
  },
  boundLimits: {
    up: -10,
    down: 402,
    left: 0,
    right: 404
  },
  space: {
    w: 101,
    h: 83,
    mid: {
      x: 101 / 2,
      y: 83 / 2
    }
  },
  rows: 6,
  columns: 5
};

const gameController = new GameController(
    new Player(),
    new GameBoard(),
    {
      setup: new Modal('setup'),
      wonModal: new Modal('won-game-modal'),
      lostModal: new Modal('lost-game-modal')
    }
);

Resources.onReady(function() {
  gameController.init();
  gameController.registerEventListeners();
});