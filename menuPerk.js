class menuPerk {
  constructor(img, path) {
    this.element = document.createElement("div")
    this.image = document.createElement("img")
    this.element.appendChild(this.image)

    this.element.className = "menuPerk"
    this.image.src = path + img;
    this.id = img
    this.element.style.backgroundImage = "url('./assets/general/perkNull.png')"

    this.element.onclick = () => {

      profiles.filter(profile => profile.id == buttonSelected.id)[0].toggle(this.id)
      this.update()

    }
  }

  // matches perk background to the selected profile
  update() {
    if (profiles.filter(profile => profile.id == buttonSelected.id)[0].enabled.includes(this.id)) {
      this.element.style.backgroundImage = "url('./assets/general/perkRare.png')"
    } else {
      this.element.style.backgroundImage = "url('./assets/general/perkNull.png')"
    }

  }

}