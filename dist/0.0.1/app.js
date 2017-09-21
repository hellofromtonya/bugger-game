"use strict";

/* Resources.js
 * This is simply an image loading utility. It eases the process of loading
 * image files so that they can be used within your game. It also includes
 * a simple "caching" layer so it will reuse cached images if you attempt
 * to load the same image multiple times.
 */
(function () {
    var resourceCache = {};
    var loading = [];
    var readyCallbacks = [];

    /* This is the publicly accessible image loading function. It accepts
     * an array of strings pointing to image files or a string for a single
     * image. It will then call our private image loading function accordingly.
     */
    function load(urlOrArr) {
        if (urlOrArr instanceof Array) {
            /* If the developer passed in an array of images
             * loop through each value and call our image
             * loader on that image file
             */
            urlOrArr.forEach(function (url) {
                _load(url);
            });
        } else {
            /* The developer did not pass an array to this function,
             * assume the value is a string and call our image loader
             * directly.
             */
            _load(urlOrArr);
        }
    }

    /* This is our private image loader function, it is
     * called by the public image loader function.
     */
    function _load(url) {
        if (resourceCache[url]) {
            /* If this URL has been previously loaded it will exist within
             * our resourceCache array. Just return that image rather
             * re-loading the image.
             */
            return resourceCache[url];
        } else {
            /* This URL has not been previously loaded and is not present
             * within our cache; we'll need to load this image.
             */
            var img = new Image();
            img.onload = function () {
                /* Once our image has properly loaded, add it to our cache
                 * so that we can simply return this image if the developer
                 * attempts to load this file in the future.
                 */
                resourceCache[url] = img;

                /* Once the image is actually loaded and properly cached,
                 * call all of the onReady() callbacks we have defined.
                 */
                if (isReady()) {
                    readyCallbacks.forEach(function (func) {
                        func();
                    });
                }
            };

            /* Set the initial cache value to false, this will change when
             * the image's onload event handler is called. Finally, point
             * the image's src attribute to the passed in URL.
             */
            resourceCache[url] = false;
            img.src = url;
        }
    }

    /* This is used by developers to grab references to images they know
     * have been previously loaded. If an image is cached, this functions
     * the same as calling load() on that URL.
     */
    function get(url) {
        return resourceCache[url];
    }

    /* This function determines if all of the images that have been requested
     * for loading have in fact been properly loaded.
     */
    function isReady() {
        var ready = true;
        for (var k in resourceCache) {
            if (resourceCache.hasOwnProperty(k) && !resourceCache[k]) {
                ready = false;
            }
        }
        return ready;
    }

    /* This function will add a function to the callback stack that is called
     * when all requested images are properly loaded.
     */
    function onReady(func) {
        readyCallbacks.push(func);
    }

    /* This object defines the publicly accessible functions available to
     * developers by creating a global Resources object.
     */
    window.Resources = {
        load: load,
        get: get,
        onReady: onReady,
        isReady: isReady
    };
})();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameBoard = function () {
  /**
   * @description Instantiate the game board
   * @param {number} boardWidth Canvas width
   * @param {number} boardHeight Canvas height
   * @param {number} rows Number of rows on the game board
   * @param {number} columns Number of columns on the game board
   *
   * @method
   */
  function GameBoard() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$boardWidth = _ref.boardWidth,
        boardWidth = _ref$boardWidth === undefined ? 606 : _ref$boardWidth,
        _ref$boardHeight = _ref.boardHeight,
        boardHeight = _ref$boardHeight === undefined ? 606 : _ref$boardHeight,
        _ref$rows = _ref.rows,
        rows = _ref$rows === undefined ? 6 : _ref$rows,
        _ref$columns = _ref.columns,
        columns = _ref$columns === undefined ? 5 : _ref$columns;

    _classCallCheck(this, GameBoard);

    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.canvas.width = boardWidth;
    this.canvas.height = boardHeight;
    this._rows = rows;
    this._columns = columns;

    document.getElementsByClassName('game-board-container')[0].appendChild(this.canvas);

    this.elements = {
      score: document.getElementsByClassName('score')[0]
    };
  }

  _createClass(GameBoard, [{
    key: 'reset',
    value: function reset() {}
  }, {
    key: 'render',
    value: function render() {
      /* This array holds the relative URL to the image used
       * for that particular row of the game level.
       */
      var rowImages = ['images/water-block.png', // Top row is water
      'images/stone-block.png', // Row 1 of 3 of stone
      'images/stone-block.png', // Row 2 of 3 of stone
      'images/stone-block.png', // Row 3 of 3 of stone
      'images/grass-block.png', // Row 1 of 2 of grass
      'images/grass-block.png' // Row 2 of 2 of grass
      ];

      /* Loop through the number of rows and columns we've defined above
       * and, using the rowImages array, draw the correct image for that
       * portion of the "grid"
       */
      for (var row = 0; row < this._rows; row++) {
        for (var col = 0; col < this._columns; col++) {
          /* The drawImage function of the canvas' context element
           * requires 3 parameters: the image to draw, the x coordinate
           * to start drawing and the y coordinate to start drawing.
           * We're using our Resources helpers to refer to our images
           * so that we get the benefits of caching these images, since
           * we're using them over and over.
           */
          this.ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
        }
      }
    }

    /**
     * @description Update the player's score.
     *
     * @method
     */

  }, {
    key: 'updateScore',
    value: function updateScore(score) {
      this.elements.score.innerHTML = score;
    }
  }]);

  return GameBoard;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Modal = function () {
  function Modal(modalID) {
    _classCallCheck(this, Modal);

    this._modal = document.getElementById(modalID);
    this._playButton = this._modal.getElementsByClassName('play-again')[0];
    this._score = this._modal.getElementsByClassName('score');
  }

  /**
   * @description Show the modal.
   * @param {number} score Player's score to be displayed
   *
   * @method
   */


  _createClass(Modal, [{
    key: 'show',
    value: function show() {
      var score = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      if (this._score.length > 0) {
        this._score[0].innerHTML = score;
      }
      this._modal.classList.add('active');
    }

    /**
     * @description Hide the modal.
     *
     * @method
     */

  }, {
    key: 'hide',
    value: function hide() {
      this._modal.classList.remove('active');
    }

    /**
     * @description Show the "play" button.
     *
     * @method
     */

  }, {
    key: 'showPlayButton',
    value: function showPlayButton() {
      this._playButton.classList.remove('hide');
    }

    /**
     * @description Set the character's sprite image.
     * @param character
     *
     * @method
     */

  }, {
    key: 'setCharacter',
    value: function setCharacter(character) {
      var characters = Array.from(document.querySelectorAll('.character__image'));
      if (characters.length === 0) {
        return;
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = characters[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var char = _step.value;

          char.classList.remove('active');
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      character.classList.add('active');
    }
  }]);

  return Modal;
}();
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GamePiece = function () {
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
  function GamePiece() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$row = _ref.row,
        row = _ref$row === undefined ? 0 : _ref$row,
        _ref$col = _ref.col,
        col = _ref$col === undefined ? 0 : _ref$col,
        _ref$startingPosition = _ref.startingPosition,
        startingPosition = _ref$startingPosition === undefined ? { x: null, y: null } : _ref$startingPosition,
        _ref$speed = _ref.speed,
        speed = _ref$speed === undefined ? 100 : _ref$speed,
        _ref$sprite = _ref.sprite,
        sprite = _ref$sprite === undefined ? '' : _ref$sprite;

    _classCallCheck(this, GamePiece);

    if (sprite) {
      this.setSprite('images/' + sprite);
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

      x: !startingPosition.hasOwnProperty('x') || startingPosition.x === null ? col * gameConfig.space.w - gameConfig.space.mid.x - this.insertionMidPt.x : startingPosition.x,

      y: !startingPosition.hasOwnProperty('y') || startingPosition.y === null ? row * gameConfig.space.h - gameConfig.space.mid.y - this.insertionMidPt.y : startingPosition.y
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


  _createClass(GamePiece, [{
    key: 'getLocation',
    value: function getLocation() {
      var useCache = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

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

  }, {
    key: 'updateLocation',
    value: function updateLocation() {
      this._location = {
        row: this.getRowLocation(),
        col: this.getColLocation()
      };
    }

    /**
     * @description Get the game piece's row
     * @returns {number}
     *
     * @method
     */

  }, {
    key: 'getRowLocation',
    value: function getRowLocation() {
      return Math.min(Math.ceil(this.coords.y / gameConfig.space.h) + 1, gameConfig.rows);
    }

    /**
     * @description Get the game piece's column
     * @returns {number}
     *
     * @method
     */

  }, {
    key: 'getColLocation',
    value: function getColLocation() {
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

  }, {
    key: 'update',
    value: function update() {
      var dt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      var newX = this.coords.x + dt * this.speed;

      this.coords.x = newX < gameConfig.boundLimits.right + this.size.w ? newX : -this.size.w;
    }

    /**
     * @description Draw the game piece on the board.
     * @param {object} ctx Game board's ctx
     *
     * @method
     */

  }, {
    key: 'render',
    value: function render(ctx) {
      ctx.drawImage(Resources.get(this.sprite), this.coords.x, this.coords.y);
    }

    /**
     * @description Reset to the starting position.
     *
     * @method
     */

  }, {
    key: 'reset',
    value: function reset() {
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

  }, {
    key: 'setSprite',
    value: function setSprite(newSprite) {
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { obj: {}, cb: {} };

      this.sprite = newSprite;
      Resources.load(newSprite);

      // If there's a callback, then wait for the sprite to be loaded
      // and then call the callback.
      if ((typeof callback === 'undefined' ? 'undefined' : _typeof(callback)) === 'object' && typeof callback.cb === 'function') {
        Resources.onReady(function () {
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

  }, {
    key: 'setPoints',
    value: function setPoints(points) {
      this._points = points;
    }

    /**
     * @description Get the points for this game piece.
     * @param {number} points
     */

  }, {
    key: 'getPoints',
    value: function getPoints() {
      return this._points;
    }
  }]);

  return GamePiece;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Enemy = function (_GamePiece) {
  _inherits(Enemy, _GamePiece);

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
  function Enemy() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$row = _ref.row,
        row = _ref$row === undefined ? 0 : _ref$row,
        _ref$col = _ref.col,
        col = _ref$col === undefined ? 0 : _ref$col,
        _ref$startingPosition = _ref.startingPosition,
        startingPosition = _ref$startingPosition === undefined ? { x: null, y: null } : _ref$startingPosition,
        _ref$speed = _ref.speed,
        speed = _ref$speed === undefined ? 200 : _ref$speed,
        _ref$sprite = _ref.sprite,
        sprite = _ref$sprite === undefined ? 'enemy-bug.png' : _ref$sprite;

    _classCallCheck(this, Enemy);

    return _possibleConstructorReturn(this, (Enemy.__proto__ || Object.getPrototypeOf(Enemy)).call(this, { row: row, col: col, startingPosition: startingPosition, speed: speed, sprite: sprite }));
  }

  /**
   * @description Get the game piece's column
   * @returns {number}
   *
   * @method
   */


  _createClass(Enemy, [{
    key: 'getColLocation',
    value: function getColLocation() {
      return Math.min(Math.ceil(this.coords.x / gameConfig.space.w), gameConfig.columns);
    }
  }]);

  return Enemy;
}(GamePiece);
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

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GamePiecePool = function () {

  /**
   * @description Instantiate the game piece pool.
   * @param gameBoardCTX
   *
   * @constructor
   */
  function GamePiecePool(gameBoardCTX) {
    _classCallCheck(this, GamePiecePool);

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


  _createClass(GamePiecePool, [{
    key: Symbol.iterator,
    value: function value() {
      var _this = this;

      var index = -1;

      return {
        next: function next() {
          return {
            value: _this._pool[++index],
            done: !(index in _this._pool)
          };
        }
      };
    }
  }, {
    key: 'create',


    /**
     * @description Create the pool of game pieces.
     * @param {number} qty The number of gamePieces to create
     *
     * @method
     */
    value: function create() {
      var qty = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3;

      for (var poolIndex = 1; poolIndex <= qty; poolIndex++) {
        var gamePiece = this._createGamePiece(poolIndex);
        if ((typeof gamePiece === 'undefined' ? 'undefined' : _typeof(gamePiece)) === 'object') {
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

  }, {
    key: '_createGamePiece',
    value: function _createGamePiece(poolIndex) {
      // You'll want to use this method as abstract and build your own.
      var gamePiece = new GamePiece();

      return gamePiece;
    }

    /**
     * @description Deletes (removes) the game piece from the pool.
     * @param gamePiece
     *
     * @method
     */

  }, {
    key: 'delete',
    value: function _delete(gamePiece) {
      var index = this._pool.indexOf(gamePiece);

      this._pool.splice(index, 1);
    }

    /**
     * @description Render each of the game piece in this pool.
     *
     * @method
     */

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      this._pool.forEach(function (gamePiece) {
        return gamePiece.render(_this2._gameBoardCTX);
      });
    }

    /**
     * @description Reset the pool, removing the reference to the game pieces.
     *
     * @method
     */

  }, {
    key: 'reset',
    value: function reset() {
      this._pool = [];
    }

    /**
     * @description Update game pieces' positions on the game board.
     * @param {number} dt Time delta
     *
     * @method
     */

  }, {
    key: 'update',
    value: function update() {
      var dt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.0;

      this._pool.forEach(function (gamePiece) {
        return gamePiece.update(dt);
      });
    }

    /**
     * @description Generate unique coordinates.
     * @param {{max: number, min: number}} rowRange Range of rows
     * @param {{max: number, min: number}} columnRange Range of columns
     * @returns {{x: number, y: number}}
     *
     * @method
     */

  }, {
    key: 'generateUniqueCoords',
    value: function generateUniqueCoords() {
      var rowRange = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { max: 4, min: 2 };
      var columnRange = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { max: 6, min: 1 };

      var coords = { x: 0, y: 0 };

      while (true) {
        coords = {
          x: this.constructor.generateRandom(columnRange.max, columnRange.min),
          y: this.constructor.generateRandom(rowRange.max, rowRange.min)
        };

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this._uniqueCoords[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var uniqueCoords = _step.value;

            if (uniqueCoords.x === coords.x && uniqueCoords.y === coords.y) {
              continue;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
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

  }], [{
    key: 'generateRandom',
    value: function generateRandom(max, min) {
      var returnFloating = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var randomNumber = Math.random() * (max - min + 1);

      return returnFloating === true ? randomNumber + min : Math.floor(randomNumber) + min;
    }
  }]);

  return GamePiecePool;
}();
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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EnemyPool = function (_GamePiecePool) {
  _inherits(EnemyPool, _GamePiecePool);

  /**
   * @description Instantiate the enemy pool.
   * @param gameBoardCTX
   *
   * @constructor
   */
  function EnemyPool(gameBoardCTX) {
    _classCallCheck(this, EnemyPool);

    return _possibleConstructorReturn(this, (EnemyPool.__proto__ || Object.getPrototypeOf(EnemyPool)).call(this, gameBoardCTX));
  }

  /**
   * @description Create an enemy.
   * @param {number} poolIndex Index in the enemy pool
   * @return {GamePiece}
   *
   * @method Private
   */


  _createClass(EnemyPool, [{
    key: '_createGamePiece',
    value: function _createGamePiece(poolIndex) {
      var enemy = new Enemy({
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
  }]);

  return EnemyPool;
}(GamePiecePool);
'use strict';

/**
 * @description Collectible Pool Handler
 *
 * Collection of gems for the player to collect
 * during the game.
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CollectiblePool = function (_GamePiecePool) {
  _inherits(CollectiblePool, _GamePiecePool);

  /**
   * @description Instantiate the pool.
   * @param gameBoardCTX
   *
   * @constructor
   */
  function CollectiblePool(gameBoardCTX) {
    _classCallCheck(this, CollectiblePool);

    var _this = _possibleConstructorReturn(this, (CollectiblePool.__proto__ || Object.getPrototypeOf(CollectiblePool)).call(this, gameBoardCTX));

    _this._images = ['gem-blue.png', 'gem-green.png', 'gem-orange.png'];
    return _this;
  }

  /**
   * @description Create a game piece.
   * @param {number} poolIndex Index in the enemy pool
   * @return {GamePiece|boolean}
   *
   * @method Private
   */


  _createClass(CollectiblePool, [{
    key: '_createGamePiece',
    value: function _createGamePiece(poolIndex) {
      if (poolIndex > this._images.length) {
        return false;
      }

      var coords = this.generateUniqueCoords();

      var gamePiece = new GamePiece({
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
  }]);

  return CollectiblePool;
}(GamePiecePool);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Player = function (_GamePiece) {
  _inherits(Player, _GamePiece);

  /**
   * @description Player constructor
   * @param {number} row Row number of where to put the player
   * @param {number} col Column number of where to put the player
   * @param {string} sprite Player's character image
   * @constructor
   */
  function Player() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$row = _ref.row,
        row = _ref$row === undefined ? 5 : _ref$row,
        _ref$col = _ref.col,
        col = _ref$col === undefined ? 3 : _ref$col;

    _classCallCheck(this, Player);

    var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, { row: row, col: col }));

    _this.allowedKeys = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
    };

    _this._score = 0;
    return _this;
  }

  /*****************************
   * Move Handlers
   ****************************/

  /**
   * @description Checks if the keyboard input is a valid move command
   * @param {number} keyCode Keyboard code
   * @returns {boolean}
   *
   * @method
   */


  _createClass(Player, [{
    key: 'isValidMoveCommand',
    value: function isValidMoveCommand(keyCode) {
      return this.allowedKeys.hasOwnProperty(keyCode);
    }

    /**
     * @description Handles the move command.
     * @param {number} keyCode Keyboard code
     * @returns {boolean}
     *
     * @method
     */

  }, {
    key: 'handleInput',
    value: function handleInput(keyCode) {
      switch (this.allowedKeys[keyCode]) {
        case 'left':
          this.coords.x = Math.max(this.coords.x - gameConfig.space.w, gameConfig.boundLimits.left);
          break;
        case 'up':
          this.coords.y = Math.max(this.coords.y - gameConfig.space.h, gameConfig.boundLimits.up);
          break;
        case 'right':
          this.coords.x = Math.min(this.coords.x + gameConfig.space.w, gameConfig.boundLimits.right);
          break;
        case 'down':
          this.coords.y = Math.min(this.coords.y + gameConfig.space.h, gameConfig.boundLimits.down);
          break;
      }

      this.updateLocation();
    }

    /**
     * Checks if the player has won, meaning this player is in the water.
     * @returns {boolean}
     *
     * @method
     */

  }, {
    key: 'hasWon',
    value: function hasWon() {
      return this.getLocation(true).row === 1;
    }

    /*****************************
     * Scoring
     ****************************/

    /**
     * @description Add points to the player's score.
     * @param {number} points Number of points to add to the player's score.
     *              (Can be negative)
     */

  }, {
    key: 'addScore',
    value: function addScore() {
      var points = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      this._score += points;
    }

    /**
     * @description Get the player's score.
     * @return {number}
     *
     * @method
     */

  }, {
    key: 'getScore',
    value: function getScore() {
      return this._score;
    }
  }]);

  return Player;
}(GamePiece);
'use strict';

/**
 * @description Game Controller
 */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameController = function () {
  /**
   * @description Instantiate the Game Controller
   * @param {Player} player
   * @param {GameBoard} gameBoard
   * @param {object} modals
   *
   * @constructor
   */
  function GameController(player, gameBoard) {
    var modals = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { setup: {}, wonModal: {}, lostModal: {} };

    _classCallCheck(this, GameController);

    this._player = player;
    this._gameBoard = gameBoard;
    this._modals = modals;
    this._lastTime = 0;

    this._enemies = new EnemyPool(this._gameBoard.ctx);
    this._collectibles = new CollectiblePool(this._gameBoard.ctx);
  }

  /*****************************
   * Event Listeners & Handlers
   ****************************/

  /**
   * @description Register event listeners.
   *              We have one event listener that monitors for click events
   *              and then routes the right events to their task.
   *
   * @method
   */


  _createClass(GameController, [{
    key: 'registerEventListeners',
    value: function registerEventListeners() {
      var _this = this;

      document.addEventListener('keyup', function (event) {
        return _this.handlePlayerMove(event);
      }, false);

      document.getElementsByTagName('body')[0].addEventListener('click', function (event) {
        event.stopPropagation();

        // Changing the player's character.
        if (event.target.classList.contains('character__image') || event.target.nodeName == 'IMG' && event.target.parentNode.classList.contains('character__image')) {
          return this.updatePlayerCharacter(event.target);
        }

        // Play button clicked.
        if (event.target.classList.contains('play-again')) {
          return this.startNewGame();
        }
      }.bind(this), false);
    }

    /**
     * @description Player Mover Handler
     * @param {object} event Keyup event
     *
     * @method
     */

  }, {
    key: 'handlePlayerMove',
    value: function handlePlayerMove(event) {
      event.stopImmediatePropagation();

      if (this._player.isValidMoveCommand(event.keyCode)) {
        this._player.handleInput(event.keyCode);
      }
    }

    /**
     * @description Update the player's sprite character.
     * @param {object} target Clicked event's target
     * @returns {boolean} Returns false
     *
     * @method
     */

  }, {
    key: 'updatePlayerCharacter',
    value: function updatePlayerCharacter(target) {
      if (!(target.classList.contains('character__image') || target.nodeName == 'IMG' && target.parentNode.classList.contains('character__image'))) {
        return false;
      }

      var li = void 0,
          img = void 0;
      if (target.nodeName == 'IMG') {
        li = target.parentNode;
        img = target;
      } else {
        li = target;
        img = target.getElementsByTagName('img')[0];
      }

      this._modals.setup.setCharacter(li);
      this._player.setSprite(img.getAttribute('src'),
      // this is our callback, which will run once the image is loaded.
      // we are passing the object to set `this` to our modal.
      { obj: this._modals.setup, cb: this._modals.setup.showPlayButton });

      return false;
    }

    /**
     * @description Start a new game handler
     *
     * @method
     */

  }, {
    key: 'startNewGame',
    value: function startNewGame() {
      this.reset();

      this._enemies.create(EnemyPool.generateRandom(6, 3));
      this._collectibles.create(EnemyPool.generateRandom(3, 2));
      this.updateGamePieces();
      this.render();

      this._lastTime = Date.now();
      this.play();

      return false;
    }

    /*****************************
     * Game Methods
     ****************************/

    /**
     * @description Game's play control loop.
     *
     * @method
     */

  }, {
    key: 'play',
    value: function play() {

      /* Get our time delta information which is required if your game
       * requires smooth animation. Because everyone's computer processes
       * instructions at different speeds we need a constant value that
       * would be the same for everyone (regardless of how fast their
       * computer is) - hurray time!
       */
      var now = Date.now();
      var dt = (now - this._lastTime) / 1000.0;

      this.updateGamePieces(dt);

      /* Set our lastTime variable which is used to determine the time delta
       * for the next time this function is called.
       */
      this._lastTime = now;

      this.render();

      // If the player collided into an enemy,
      // then bail out as the game is over.
      if (this.hasCollided()) {
        return this.gameOver(false);
      }

      // If the player won, then bail out
      // as the game is over.
      if (this._player.hasWon()) {
        return this.gameOver(true);
      }

      // Check if the player grabbed up a collectible.
      this.checkCollectible();

      // The loop will continue by using the browser's
      // requestAnimationFrame().
      window.requestAnimationFrame(this.play.bind(this));
    }

    /**
     * @description Player collectible handler.
     *
     * 1. Checks if the player grabbed a collectible.
     * 2. If yes, then
     *    2.1 Adds the points to the player's score.
     *    2.2 Updates the score on the game board.
     *    2.3 Removes the collectible from the game board.
     *
     * @method
     */

  }, {
    key: 'checkCollectible',
    value: function checkCollectible() {
      var collectible = this.hasCollided('_collectibles', true);

      if ((typeof collectible === 'undefined' ? 'undefined' : _typeof(collectible)) === 'object') {
        this._player.addScore(collectible.getPoints());
        this._gameBoard.updateScore(this._player.getScore());
        this._collectibles.delete(collectible);
      }
    }

    /**
     * @description Checks if the player collided with a game piece.
     * @param {string} poolProperty Pool property to use.
     * @param {boolean} returnGamePiece When true, the game piece object is
     *          returned upon a collision; else, false is returned.
     * @returns {boolean|object} When there's a collision, either the
     *                game piece object or true is true (selectable);
     *                else returns false.
     *
     * @method
     */

  }, {
    key: 'hasCollided',
    value: function hasCollided() {
      var poolProperty = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '_enemies';
      var returnGamePiece = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this[poolProperty][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var gamePiece = _step.value;

          if (this.isOnSameSpace(gamePiece)) {
            return returnGamePiece ? gamePiece : true;
          }
        }

        // Nope, player didn't collide.
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return false;
    }

    /**
     * @description Checks if the player is in the same
     *              Game Board space as the game piece.
     * @param {object} gamePiece
     * @returns {boolean}
     *
     * @method
     */

  }, {
    key: 'isOnSameSpace',
    value: function isOnSameSpace(gamePiece) {
      var playerLoc = this._player.getLocation(true);
      var gamePieceLoc = gamePiece.getLocation();

      return playerLoc.row === gamePieceLoc.row && playerLoc.col === gamePieceLoc.col;
    }

    /**
     * @description Render the board and game pieces (draw in canvas)
     *
     * @method
     */

  }, {
    key: 'render',
    value: function render() {
      this._gameBoard.render();
      this._player.render(this._gameBoard.ctx);
      this._enemies.render();
      this._collectibles.render();
    }

    /**
     * @description Reset the game.
     *
     * @method
     */

  }, {
    key: 'reset',
    value: function reset() {
      for (var modalKey in this._modals) {
        this._modals[modalKey].hide();
      }

      this._gameBoard.reset();
      this._enemies.reset();
      this._player.reset();
      this._collectibles.reset();
    }

    /**
     * @description Update game pieces' positions on the game board.
     * @param {number} dt Time delta
     *
     * @method
     */

  }, {
    key: 'updateGamePieces',
    value: function updateGamePieces() {
      var dt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.0;

      this._enemies.update(dt);
      this._player.update();
      this._collectibles.update();
    }

    /**
     * @description Game is over handler. Show the appropriate modal.
     * @param playerWon
     *
     * @method
     */

  }, {
    key: 'gameOver',
    value: function gameOver() {
      var playerWon = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      var score = this._player.getScore();

      var points = playerWon === true ? 10000 : score > 10000 ? -10000 : -score;

      this._player.addScore(points);
      score = this._player.getScore();
      this._gameBoard.updateScore(score);

      if (playerWon === true) {
        this._modals.wonModal.show(score);
      } else {
        this._modals.lostModal.show();
      }
    }
  }]);

  return GameController;
}();
'use strict';

var gameConfig = {
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
Resources.load(['images/stone-block.png', 'images/water-block.png', 'images/grass-block.png', 'images/enemy-bug.png', 'images/gem-blue.png', 'images/gem-green.png', 'images/gem-orange.png']);

var gameController = new GameController(new Player(), new GameBoard({
  boardWidth: gameConfig.dims.w,
  boardHeight: gameConfig.dims.h,
  rows: gameConfig.rows,
  columns: gameConfig.columns
}), {
  setup: new Modal('setup'),
  wonModal: new Modal('won-game-modal'),
  lostModal: new Modal('lost-game-modal')
});

gameController.registerEventListeners();