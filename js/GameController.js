'use strict';

/**
 * @description Game Controller
 */
class GameController {
  /**
   * @description Instantiate the Game Controller
   * @param {Player} player
   * @param {GameBoard} gameBoard
   * @param {object} modals
   *
   * @constructor
   */
  constructor(player, gameBoard, modals = {setup: {}, wonModal: {}, lostModal: {}}) {
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
  registerEventListeners() {
    document.addEventListener('keyup', event => this.handlePlayerMove(event), false);

    document.getElementsByTagName('body')[0].addEventListener('click', function(event) {
      event.stopPropagation();

      // Changing the player's character.
      if (event.target.classList.contains('character__image') ||
          event.target.nodeName == 'IMG' && event.target.parentNode.classList.contains('character__image')) {
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
  handlePlayerMove(event) {
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
  updatePlayerCharacter(target) {
    if (!(target.classList.contains('character__image') ||
            target.nodeName == 'IMG' && target.parentNode.classList.contains('character__image'))) {
      return false;
    }

    let li, img;
    if (target.nodeName == 'IMG') {
      li = target.parentNode;
      img = target;
    } else {
      li = target;
      img = target.getElementsByTagName('img')[0];
    }

    this._modals.setup.setCharacter(li);
    this._player.setSprite(
        img.getAttribute('src'),
        // this is our callback, which will run once the image is loaded.
        // we are passing the object to set `this` to our modal.
        {obj: this._modals.setup, cb: this._modals.setup.showPlayButton}
    );

    return false;
  }

  /**
   * @description Start a new game handler
   *
   * @method
   */
  startNewGame() {
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
  play() {

    /* Get our time delta information which is required if your game
     * requires smooth animation. Because everyone's computer processes
     * instructions at different speeds we need a constant value that
     * would be the same for everyone (regardless of how fast their
     * computer is) - hurray time!
     */
    const now = Date.now();
    const dt = (now - this._lastTime) / 1000.0;

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
  checkCollectible() {
    const collectible = this.hasCollided('_collectibles', true);

    if (typeof collectible === 'object') {
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
  hasCollided(poolProperty = '_enemies', returnGamePiece = false) {
    for (const gamePiece of this[poolProperty]) {
      if (this.isOnSameSpace(gamePiece)) {
        return returnGamePiece ? gamePiece : true;
      }
    }

    // Nope, player didn't collide.
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
  isOnSameSpace(gamePiece) {
    const playerLoc = this._player.getLocation(true);
    const gamePieceLoc = gamePiece.getLocation();

    return playerLoc.row === gamePieceLoc.row &&
        playerLoc.col === gamePieceLoc.col;
  }

  /**
   * @description Render the board and game pieces (draw in canvas)
   *
   * @method
   */
  render() {
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
  reset() {
    for (let modalKey in this._modals) {
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
  updateGamePieces(dt = 0.0) {
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
  gameOver(playerWon = false) {
    let score = this._player.getScore();

    let points = playerWon === true
        ? 10000
        : score > 10000 ? -10000 : -score;

    this._player.addScore(points);
    score = this._player.getScore();
    this._gameBoard.updateScore(score);

    if (playerWon === true) {
      this._modals.wonModal.show(score);
    } else {
      this._modals.lostModal.show();
    }

  }
}