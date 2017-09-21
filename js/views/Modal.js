class Modal {
  constructor(modalID) {
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
  show(score = 0) {
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
  hide() {
    this._modal.classList.remove('active');
  }

  /**
   * @description Show the "play" button.
   *
   * @method
   */
  showPlayButton() {
    this._playButton.classList.remove('hide');
  }

  /**
   * @description Set the character's sprite image.
   * @param character
   *
   * @method
   */
  setCharacter(character) {
    const characters = Array.from(document.querySelectorAll('.character__image'));
    if (characters.length === 0) {
      return;
    }

    for (const char of characters) {
      char.classList.remove('active');
    }

    character.classList.add('active');
  }

}