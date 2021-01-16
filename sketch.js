//Samuel Guilbeault
//ICS3U-2
//Ms. Valentina Hideg
//5 June 2018


//CREATES CHARACTER BUTTON ELEMENTS FROM profiles IN path AND ADDS THEM TO div
//buttonSelected must already be defined
//post: selects the button passed into the function or deselects it if already selected
function selectButton(button) {
  if (buttonSelected != null) {
    buttonSelected.heavyBorder.style.opacity = 0;
  }
  if (button) {
    buttonSelected = button;
    buttonSelected.heavyBorder.style.opacity = 1;
    updateMenuPerks()
  } else {
    buttonSelected = null;
  }
}

//pre: randomizerMode has already been defined, 1-3
//post: hides and shows certain elements based on what mode is selecte
function changeRandomizer() {
  if (randomizerMode == 0) {
    randomizer.style.display = "inline-block"
    perkMenu.style.display = "none"
  } else if (randomizerMode == 1 || randomizerMode == 2) {
    randomizer.style.display = "none"
    perkMenu.style.display = "inline-block"
  }

}

//pre: none
//post: adjusts perk menu and centers it, shows only the perks on current page, sets menu page to valid number if out-of-range
function updateMenu() {
  var vw = window.innerWidth;
  var vh = window.innerHeight;
  perkRows = Math.floor(((vh - 0.08 * vw) - .02 * vw) / (.12 * vw));
  perkColumns = Math.floor((vw - .02 * vw) / (.12 * vw))
  perksPerPage = perkRows * perkColumns - 1

  let adjustmentH = ((vh - 0.08 * vw) - perkRows * 0.12 * vw) / 2 - 0.02 * vw
  perkMenuSurvivor.style.top = adjustmentH + "px"
  perkMenuKiller.style.top = adjustmentH + "px"

  let adjustmentW = vw % (0.12 * vw) / 2 - 0.01 * vw
  perkMenuSurvivor.style.left = adjustmentW + "px"
  perkMenuKiller.style.left = adjustmentW + "px"

  if (menuPage + 1 >= menuPerks[profileMode].length / (perkRows * perkColumns - 1)) {
    menuPage = Math.ceil(menuPerks[profileMode].length / (perkRows * perkColumns - 1)) - 1
  }

  for (i = 0; i < menuPerks[profileMode].length; i++) {
    if (i >= perksPerPage * menuPage && i < perksPerPage * (menuPage + 1)) {
      menuPerks[profileMode][i].element.style.display = "inline-block"
    } else {
      menuPerks[profileMode][i].element.style.display = "none"
    }

  }

}

//pre: none
//post: returns profiles with specified ids
function loadProfiles(profileIDs) {
  profiles = []
  for (i of profileIDs) {
    profiles.push(new profile(i))
  }
  return profiles
}

//currently unused, for future saving
//pre: none
//post: converts string to string of ones and zeroes
function convertToBinary(string) {
  out = ""
  for (let i = 0; i < string.length; i++) {
    out += "0".repeat(8 - string.charCodeAt(i).toString(2).length) + string.charCodeAt(i).toString(2)
  }
  return out
}

//currently unused, for future saving
//pre: binaryString contains only 0 and 1
//post: returns string converted from binary
function convertFromBinary(binaryString) {
  let out = ""
  for (let i = 0; i < binaryString.length / 8; i++) {
    out += String.fromCharCode(parseInt(binaryString.substr(i * 8, 8), 2))
  }
  return out
}

//cuurently unused, for future saving
//pre: none
//post: saves profiles to a cookie
function saveProfilesToCookie() {
  let ds = ""
  let dk = ""

  for (profile of profiles) {
    if (profileIDs[0].includes(profile.id)) { //SURVIVOR PROFILE
      for (perk of perks[0]) {
        if (profile.enabled.includes(perk)) {
          ds += 1
        } else {
          ds += 0
        }
      }
    } else { //KILLER PROFILES
      for (perk of perks[1]) {
        if (profile.enabled.includes(perk)) {
          dk += 1
        } else {
          dk += 0
        }
      }
    }
  }

  document.cookie = "d=" + ds

  console.log(ds + "\n" + dk)

}

//pre: none
//post: changes color of perks in menu to reflect selected profile
function updateMenuPerks() {
  for (perk of menuPerks[0].concat(menuPerks[1])) {
    perk.update()
  }
}

//SCRIPT EXECUTES WHEN WINDOW IS FULLY LOADED//
//pre: none
//post: all logic for when page loads
window.onload = function() {

  console.log("start")
  console.log(document.cookie)

  //SET UP PERK ELEMENTS
  perks = [
    ['iconPerks_aceInTheHole.png', 'iconPerks_adrenaline.png', 'iconPerks_alert.png', 'iconPerks_balancedLanding.png', 'iconPerks_bond.png', 'iconPerks_borrowedTime.png', 'iconPerks_botanyKnowledge.png', 'iconPerks_calmSpirit.png', 'iconPerks_darkSense.png', 'iconPerks_DeadHard.png', 'iconPerks_decisiveStrike.png', 'iconPerks_dejaVu.png', 'iconPerks_detectivesHunch.png', 'iconPerks_empathy.png', 'iconPerks_hope.png', 'iconPerks_ironWill.png', 'iconPerks_kindred.png', 'iconPerks_leader.png', 'iconPerks_leftBehind.png', 'iconPerks_lightweight.png', 'iconPerks_lithe.png', 'iconPerks_NoMither.png', 'iconPerks_noOneLeftBehind.png', 'iconPerks_objectOfObsession.png', 'iconPerks_openHanded.png', 'iconPerks_pharmacy.png', 'iconPerks_plunderersInstinct.png', 'iconPerks_premonition.png', 'iconPerks_proveThyself.png', 'iconPerks_quickAndQuiet.png', 'iconPerks_resilience.png', 'iconPerks_saboteur.png', 'iconPerks_selfCare.png', 'iconPerks_slipperyMeat.png', 'iconPerks_smallGame.png', 'iconPerks_soleSurvivor.png', 'iconPerks_spineChill.png', 'iconPerks_sprintBurst.png', 'iconPerks_stakeOut.png', 'iconPerks_streetwise.png', 'iconPerks_technician.png', 'iconPerks_tenacity.png', 'iconPerks_thisIsNotHappening.png', 'iconPerks_unbreakable.png', 'iconPerks_upTheAnte.png', 'iconPerks_urbanEvasion.png', 'iconPerks_vigil.png', 'iconPerks_wakeUp.png', 'iconPerks_wellMakeIt.png', 'iconPerks_WereGonnaLiveForever.png'],
    ['iconPerks_agitation.png', 'iconPerks_aNursesCalling.png', 'iconPerks_BBQAndChili.png', 'iconPerks_BeastOfPrey.png', 'iconPerks_bitterMurmur.png', 'iconPerks_bloodhound.png', 'iconPerks_bloodWarden.png', 'iconPerks_brutalStrength.png', 'iconPerks_deerstalker.png', 'iconPerks_devourHope.png', 'iconPerks_distressing.png', 'iconPerks_dyingLight.png', 'iconPerks_enduring.png', 'iconPerks_fireUp.png', 'iconPerks_franklinsLoss.png', 'iconPerks_generatorOvercharge.png', 'iconPerks_hangmansTrick.png', 'iconPerks_HuntressLullaby.png', 'iconPerks_insidious.png', 'iconPerks_ironGrasp.png', 'iconPerks_knockOut.png', 'iconPerks_lightborn.png', 'iconPerks_makeYourChoice.png', 'iconPerks_monitorAndAbuse.png', 'iconPerks_monstrousShrine.png', 'iconPerks_noOneEscapesDeath.png', 'iconPerks_overwhelmingPresence.png', 'iconPerks_playWithYourFood.png', 'iconPerks_predator.png', 'iconPerks_rememberMe.png', 'iconPerks_ruin.png', 'iconPerks_saveTheBestForLast.png', 'iconPerks_shadowborn.png', 'iconPerks_sloppyButcher.png', 'iconPerks_spiesFromTheShadows.png', 'iconPerks_stridor.png', 'iconPerks_surveillance.png', 'iconPerks_TerritorialImperative.png', 'iconPerks_thatanophobia.png', 'iconPerks_theThirdSeal.png', 'iconPerks_thrillOfTheHunt.png', 'iconPerks_tinkerer.png', 'iconPerks_unnervingPresence.png', 'iconPerks_unrelenting.png', 'iconPerks_whispers.png'],
  ];

  menuPerks = [
    [],
    []
  ]

  //CUSTOMIZATION general
  menuController = new menuController;
  menuPage = 0;

  //CUSTOMIZATION MENU S
  perkMenuSurvivor = document.getElementById("perkMenuSurvivor")
  for (i of perks[0]) {
    let perk = new menuPerk(i, "./assets/survivor/perks/")
    perkMenuSurvivor.appendChild(perk.element)
    menuPerks[0].push(perk)
  }

  //CUSTOMIZATION MENU K
  perkMenuKiller = document.getElementById("perkMenuKiller")
  for (i of perks[1]) {
    let perk = new menuPerk(i, "./assets/killer/perks/")
    perkMenuKiller.appendChild(perk.element)
    menuPerks[1].push(perk)
  }

  perkMenuSurvivor.appendChild(menuController.element)

  profileIDs = [
    ['AV_charSelect_portrait.png', 'BO_charSelect_portrait.png', 'CM_charSelect_portrait.png', 'DF_charSelect_portrait.png', 'DK_charSelect_portrait.png', 'FM_charSelect_portrait.png', 'FS_charSelect_portrait.png', 'JP_charSelect_portrait.png', 'LS_charSelect_portrait.png', 'MT_charSelect_portrait.png', 'NK_charSelect_portrait.png', 'QS_charSelect_portrait.png'],
    ['BE_charSelect_portrait.png', 'CA_charSelect_portrait.png', 'DO_charSelect_portrait.png', 'FK_charSelect_portrait.png', 'HA_charSelect_portrait.png', 'HB_charSelect_portrait.png', 'NR_charSelect_portrait.png', 'SD_charSelect_portrait.png', 'SH_charSelect_portrait.png', 'TR_charSelect_portrait.png', 'WR_charSelect_portrait.png']
  ]

  //creates list of profiles
  profiles = loadProfiles(profileIDs[0].concat(profileIDs[1]))

  //declares global variables
  const randomizerSlots = document.getElementsByClassName("r");
  profileMode = 0;
  randomizerMode = 0;
  buttonSelected = null;

  window.addEventListener("resize", updateMenu);
  //assigns click on randomizer to randomize perks
  randomizer = document.getElementById("randomizer")
  randomizer.style.display = "inline-block"
  randomizer.onclick = function randomizePerks() { //pre: none //post: displays four random perks on the randomizer
    let perksEnabled;
    if (buttonSelected) {
      perksEnabled = profiles.filter(profile => profile.id == buttonSelected.id)[0].enabled.slice()
    } else {
      perksEnabled = perks[profileMode].slice()
    }
    for (slot of randomizerSlots) {
      if (perksEnabled.length > 0) {
        index = Math.floor(Math.random() * perksEnabled.length); //chooses random perk
        slot.src = "./assets/" + (profileMode == 0 ? "survivor" : "killer") + "/perks/" + perksEnabled[index];
        perksEnabled.splice(index, 1);
      } else {
        slot.src = "./assets/general/boxOpen.png"
      }
    }
  }

  //glow effect on randomizer hover
  document.getElementById("randomizer").onmouseover = function highlight() {

    for (item of document.getElementsByClassName("pbg")) {
      item.style.filter = "saturate(100%)";
    }
  }

  //reverse glow effect on randomizer hover
  document.getElementById("randomizer").onmouseout = function highlight() {

    for (item of document.getElementsByClassName("pbg")) {
      item.style.filter = "saturate(80%)";
    }
  }

  //profileMode SWITCH BUTTON//
  const switchButton = document.createElement("div");
  document.getElementById("charSelect").appendChild(switchButton);
  switchButton.id = "switchButton";
  switchButton.className = "charButton";

  const switchButtonImg = document.createElement("div");
  switchButtonImg.id = "switchButtonImg";
  switchButtonImg.style = "background-image: url('./assets/general/swapSurvivor.png";
  switchButton.appendChild(switchButtonImg);

  const border = document.createElement("img");
  border.src = "./assets/general/switchHover.png"
  border.className = "border"


  //SWITCHBUTTON FUNCTIONALITY
  switchButton.onmouseover = () => {
    border.style.opacity = 1;
  }
  switchButton.onmouseout = () => {
    border.style.opacity = 0.3;
  }

  //switches from survivors to killers
  switchButton.onclick = () => {
    selectButton();
    menuPage = 0
    if (profileMode == 0) {
      profileMode = 1;
      randomizerMode = 0
      changeRandomizer()
      switchButtonImg.style = "background-image: url('./assets/general/swapKiller.png";
      characterMenuKiller.style.display = "inline-block";
      characterMenuSurvivor.style.display = "none";
      perkMenuKiller.style.display = "inline-block"
      perkMenuSurvivor.style.display = "none"
      perkMenuKiller.appendChild(menuController.element)
    } else {
      profileMode = 0;
      randomizerMode = 0
      changeRandomizer()
      switchButtonImg.style = "background-image: url('./assets/general/swapSurvivor.png";
      characterMenuKiller.style.display = "none";
      characterMenuSurvivor.style.display = "inline-block";
      perkMenuSurvivor.style.display = "inline-block"
      perkMenuKiller.style.display = "none"
      perkMenuSurvivor.appendChild(menuController.element)
    }
  }

  //SURVIVOR CHAR BAR//
  const characterMenuSurvivor = document.createElement("div");
  characterMenuSurvivor.id = "characterMenuSurvivor";
  document.getElementById("charSelect").appendChild(characterMenuSurvivor);
  for (i of profileIDs[0]) {
    button = new characterButton("./assets/survivor/portraits/", i)
    characterMenuSurvivor.appendChild(button.element)
  }

  //KILLER CHAR BAR//
  const characterMenuKiller = document.createElement("div");
  characterMenuKiller.id = "characterMenuKiller";
  document.getElementById("charSelect").appendChild(characterMenuKiller);
  for (i of profileIDs[1]) {
    button = new characterButton("./assets/killer/portraits/", i)
    characterMenuKiller.appendChild(button.element)
  }
}