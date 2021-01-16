class profile {
  constructor(id, enabled) {
    this.id = id;
    this.enabled = ((enabled == undefined) ? [] : enabled)
  }

  //pre: none
  //post: switches if perk is enabled in perk
  toggle(perk) {
    if (this.enabled.includes(perk)) {
      this.enabled.splice(this.enabled.indexOf(perk), 1)
    } else {
      this.enabled.push(perk)
    }
  }

}