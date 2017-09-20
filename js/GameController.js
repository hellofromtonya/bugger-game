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


    if (this.checkCollisions()) {
      this.gameOver(false);
    }
    // Check if the player won. If yes, then reset.
    else if (this._player.won()) {
      this.gameOver(true);
    }
    /* Call our update/render functions, pass along the time delta to
     * our update function since it may be used for smooth animation.
     */
    else {
      this.updateGamePieces(dt);

      /* Set our lastTime variable which is used to determine the time delta
       * for the next time this function is called.
       */
      this._lastTime = now;

      /* Use the browser's requestAnimationFrame function to call this
       * function again as soon as the browser is able to draw another frame.
       */
      window.requestAnimationFrame(this.play.bind(this));
    }

    this.render();
  }

  /**
   * @description Check collisions
   * @returns {boolean}
   *
   * @method
   */
  checkCollisions() {
    for (const enemy of this._enemies) {
      if (this._player.coords.y !== enemy.coords.y) {
        continue;
      }

      const xDelta = Math.abs(this._player.coords.x - enemy.coords.x);

      if (xDelta <= (this._player.size.w / 2)) {
        return true;
      }
    }

    return false;
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
  }

  /**
   * @description Game is over handler. Show the appropriate modal.
   * @param playerWon
   *
   * @method
   */
  gameOver(playerWon = false) {
    if (playerWon === true) {

      this._modals.wonModal.show(
          this._player.tallyGameStats()
      );

    } else {
      this._modals.lostModal.show();
    }
  }

}