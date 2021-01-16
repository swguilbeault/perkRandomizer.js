class menuController {
  constructor() {
    this.element = document.createElement("div")
    this.arrowLeft = document.createElement("img")
    this.arrowRight = document.createElement("img")
    this.element.appendChild(this.arrowLeft)
    this.element.appendChild(this.arrowRight)

    this.element.className = "menuController"
    this.arrowLeft.src = './assets/general/iconArrow.png'
    this.arrowLeft.style.transform = "scaleX(-1)"
    this.arrowRight.src = './assets/general/iconArrow.png'

    this.arrowLeft.onclick = () => { //pre: none //post: changes menu page if possible
      if (menuPage > 0) {
        menuPage -= 1
        updateMenu()
      }
    }
    this.arrowRight.onclick = () => { //pre: none //post: changes menu page if possible
      if (menuPage + 1 < menuPerks[profileMode].length / (perkRows * perkColumns - 1)) {
        menuPage += 1
        updateMenu()
      }
    }



  }
}