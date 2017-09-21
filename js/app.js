'use strict';

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
  columns: 5,
  gamePiece: {
    w: 101,
    h: 171
  }
};

// Pre-load the known game images.
Resources.load([
  'images/stone-block.png',
  'images/water-block.png',
  'images/grass-block.png',
  'images/enemy-bug.png',
  'images/selector.png',
  'images/gem-blue.png',
  'images/gem-green.png',
  'images/gem-orange.png',
]);

const gameController = new GameController(
    new Player(),
    new GameBoard({
      boardWidth: gameConfig.dims.w,
      boardHeight: gameConfig.dims.h,
      rows: gameConfig.rows,
      columns: gameConfig.columns
    }),
    {
      setup: new Modal('setup'),
      wonModal: new Modal('won-game-modal'),
      lostModal: new Modal('lost-game-modal')
    }
);

gameController.registerEventListeners();