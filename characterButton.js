class characterButton {
  constructor(imagePath, img, className) {
    //creates the elements of a character button
    this.element = document.createElement("div")
    this.portrait = document.createElement("div")
    this.border = document.createElement("img")
    this.editIcon = document.createElement("img")
    this.heavyBorder = document.createElement("img")
    this.id = img

    //adds child nodes to overarching div
    for (let i of [this.portrait, this.border, this.heavyBorder, this.editIcon]) {
      this.element.appendChild(i);
    }

    //add functionality to the button
    this.element.className = "characterButton"
    this.element.onmouseover = () => {
      this.border.style.opacity = 1;
      this.editIcon.style.opacity = Math.max(parseFloat(this.editIcon.style.opacity), 0) + 0.5;
    }
    this.element.onmouseout = () => {
      this.editIcon.style.opacity = 0;
      this.border.style.opacity = 0.3;
    }
    this.element.onclick = () => {
      if (buttonSelected != this) {
        selectButton(this);
      } else if (randomizerMode == 0) {
        selectButton()
      }

      if (randomizerMode > 0 && randomizerMode <= 2) {
        randomizerMode -= 1;
        changeRandomizer();
      }

    }

    this.portrait.className = "portrait"
    this.portrait.style = "background-image: url('" + imagePath + img + "')"

    this.border.className = "border"
    this.border.src = "./assets/general/switchHover.png"

    this.editIcon.className = "editIcon"
    this.editIcon.src = "./assets/general/iconEditHover.png"
    this.editIcon.style.opacity = 0;
    this.editIcon.onmouseover = () => {
      this.editIcon.style.opacity = parseFloat(this.editIcon.style.opacity) + 0.5;
    }
    this.editIcon.onmouseout = () => {
      this.editIcon.style.opacity = Math.max(parseFloat(this.editIcon.style.opacity) - 0.5, 0);
    }
    this.editIcon.onclick = () => {
      if (randomizerMode <= 1 && randomizerMode >= 0) {
        randomizerMode = 2;
        changeRandomizer();
        updateMenu();

        if (buttonSelected != this) {
          selectButton(this)
        }

      }

    }

    this.heavyBorder.className = "heavyBorder"
    this.heavyBorder.src = "./assets/general/switchSelected.png"
  }

}