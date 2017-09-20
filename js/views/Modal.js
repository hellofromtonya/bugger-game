class Modal {
  constructor(modalID) {
    this._modal = document.getElementById(modalID);
  }

  show() {
    this._modal.classList.add('active');
  }

  hide() {
    this._modal.classList.remove('active');
  }

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