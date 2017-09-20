class Modal {
  constructor(modalID) {
    this._modal = document.getElementById(modalID);
    this._playButton = this._modal.getElementsByClassName('play-again')[0];
  }

  /**
   * @description Show the modal.
   *
   * @method
   */
  show() {
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