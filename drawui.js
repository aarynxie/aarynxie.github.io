let uiStickBarImage;
let uiHealthBarImage;
let uiAbilitiesBarImage;
let freezingImage;
let fontRegular;
let fontBold;
let uiInventoryImage;
let inventoryItemsImage = [];
let uiNewItemImage;
let uiHealImage;

let cutscene1Image;
let cutscene2Image;

let dialogueErinImage;
let dialogueGrandmaImage;

let dialogueBgImages = [];

let arrowImages = {}; // Store arrow images
let arrows = []; // Store active arrows

let somaCheckImage;
let somaCheckDoneImage;

function uiPreload() {
  uiStickBarImage = loadImage("sprites/ui/stickbar.png");
  uiHealthBarImage = loadImage("sprites/ui/healthbar.png");
  uiAbilitiesBarImage = loadImage("sprites/ui/abilitiesbar.png");
  uiInventoryImage = loadImage("sprites/ui/inventory.png");
  freezingImage = loadImage("sprites/ui/freezing.png");
  fontRegular = loadFont("fonts/MinecraftRegular-Bmg3.otf");
  fontBold = loadFont("fonts/MinecraftBold-nMK1.otf");
  dialogueBgImages[0] = loadImage("sprites/ui/dialogue_textbox_Erin.png");
  dialogueBgImages[1] = loadImage("sprites/ui/dialogue_textbox_Grandma.png");

  inventoryItemsImage[0] = loadImage("sprites/ui/inventory/flashlight.png");
  inventoryItemsImage[1] = loadImage("sprites/ui/inventory/binoculars.png");
  inventoryItemsImage[2] = loadImage("sprites/ui/inventory/sketchbook.png");
  inventoryItemsImage[3] = loadImage("sprites/ui/inventory/waterbottle.png");
  inventoryItemsImage[4] = loadImage("sprites/ui/inventory/bunnyslippers.png");
  inventoryItemsImage[5] = loadImage("sprites/ui/inventory/healthpack.png");
  inventoryItemsImage[6] = loadImage("sprites/ui/inventory/stick.png");
  inventoryItemsImage[7] = loadImage("sprites/ui/inventory/worm.png");
  inventoryItemsImage[8] = loadImage("sprites/ui/inventory/jacket.png");
  inventoryItemsImage[9] = loadImage("sprites/ui/inventory/headphones-1.png");
  inventoryItemsImage[10] = loadImage("sprites/ui/inventory/headphones-2.png");

  uiNewItemImage = loadImage("sprites/ui/newitem.png");
  uiHealImage = loadImage("sprites/ui/heal.png");

  dialogueErinImage = loadImage("sprites/ui/dialogue_textbox_Erin.png");
  dialogueGrandmaImage = loadImage("sprites/ui/dialogue_textbox_Grandma.png");

  arrowImages["UP"] = loadImage("sprites/ui/uparrow.png");
  arrowImages["DOWN"] = loadImage("sprites/ui/downarrow.png");
  arrowImages["LEFT"] = loadImage("sprites/ui/leftarrow.png");
  arrowImages["RIGHT"] = loadImage("sprites/ui/rightarrow.png");

  cutscene1Image = loadImage("sprites/ui/owlandkey.png");
  cutscene2Image = loadImage("sprites/ui/birdAndnest.png");

  somaCheckImage = loadImage("sprites/ui/somacheckbg.png");
  somaCheckDoneImage = loadImage("sprites/ui/somacheckbgdone.png");
}

let stickBarText;
function uiDraw() {
  newItemDraw();
  abilitiesBarDraw();
  healthBarDraw();
  inventoryDraw();
  uiArrowDraw();
}

function newItemDraw() {
  push();
  //image(uiStickBarImage, 690, 10, 100, 49);
  if (newItem !== 5) {
    if (currentLevel !== 3 && objectivesCounter !== objectivesTotal) {
      // test this
    }
    if (currentLevel == 3 && !dialogueDone[24]) {
    } else {
      drawNewItem(newItem);
    }
  }

  //stickBarText = objectivesCounter + "/" + objectivesTotal;
  textSize(20);
  text(stickBarText, 745, 40);
  pop();
}

let frameCountNewItem = 0;
let itemX = 800; // Start offscreen
let itemOpacity = 255; // Fully visible

function drawNewItem(newItem2) {
  if (ifNewItem) {
    frameCountNewItem++;

    // Move in from the right
    if (itemX > 690) {
      itemX = 800 - frameCountNewItem * 4; // Moves left
    }

    // Start fading out after 60 frames
    if (frameCountNewItem > 80) {
      itemOpacity -= 5; // Reduce opacity gradually
      if (itemOpacity < 0) itemOpacity = 0; // Ensure it doesn’t go below 0
    }

    // Set transparency
    tint(255, itemOpacity);

    // Draw images
    image(uiNewItemImage, itemX, 10, 102.9, 60.2);
    image(inventoryItemsImage[newItem2], itemX + 15, 25);

    // Reset after fully faded
    if (itemOpacity === 0) {
      frameCountNewItem = 0;
      itemOpacity = 255;
      itemX = 800;
      ifNewItem = false;
    }
    // Remove tint after drawing
    noTint();
  }
}

let ifHeal = false;
let healX, healY, healY2;
let healFrames = 0; // Frame counter for animation
let healOpacity = 350; // Start fully visible

function healDraw() {
  healX = playerPos.x;
  if (ifHeal) {
    healFrames++;
    if (!healSound.isPlaying() && healFrames >= 10) {
      healSound.play();
    }

    // Move up gradually (1.5 pixels per frame)
    healY -= 1;

    // Fade out gradually (reduce opacity)
    healOpacity -= 6; // Decrease opacity (255 → 0 over ~30 frames)

    // Set transparency
    tint(255, healOpacity);
    healY2 = playerPos.y + healY + 20;
    image(uiHealImage, healX, healY2);
    noTint(); // Reset tint after drawing

    // Stop animation after ~60 frames
    if (healFrames >= 60) {
      ifHeal = false;
      healFrames = 0;
      healOpacity = 350; // Reset opacity for next use
    }
  }
}

// Call this function when healing starts
function startHealEffect() {
  ifHeal = true;
  healFrames = 0;
  healY = 0;
  healOpacity = 350;
}

function healthBarDraw() {
  image(uiHealthBarImage, 10, 10);
  push();
  fill("#a43131");
  noStroke();
  let healthWidth = map(health, 0, maxHealth, 0, 126);
  rect(83, 36, healthWidth, 22);
  pop();
}

function abilitiesBarDraw() {
  image(uiAbilitiesBarImage, 10, 505);
  push();
  fill(0, 150);
  noStroke();
  // draw cooldown
  let cooldownHeight = map(timeSinceSomaCheck, 0, 1500, 60, 0);
  rect(26, 518, 60, max(cooldownHeight, 0));
  pop();
}

let temperature = 4000;
let maxTemperature = temperature;

//let jacket = { x: 500, y: 200, w: 50, h: 50 };
let wearingJacket = false;
function temperatureCheck() {
  if (currentLevel == 2 || currentLevel == 3) {
    if (!wearingJacket) {
      temperature -= 0.7;
    } else {
      temperature = maxTemperature;
    }
    playerSpeed = max(
      1.2,
      map(temperature, 0, maxTemperature - 2000, 1.2, 2.5)
    );
    if (playerSpeed > 2.5) {
      playerSpeed = 2.5;
    }
    //console.log(playerSpeed);
    frameDelay = map(playerSpeed, 1, 2.5, 16, 12);
  }
}

function freezingDraw() {
  push();
  let freezingOpacity = map(temperature, 0, 2500, 255, 0);
  tint(255, freezingOpacity);
  image(freezingImage, 0, 0);
  pop();
}

let randomSO = 700;
let level3FrameCount = 0;

let minRandomSO = 1000;
let maxRandomSO = 1600;
let headphonesStage = 0;
let countSO = 0;
let playingSO = false;
let stopMoveSO = false;

let stageDuration = 100;
let firstSO = false;
function soundOverload() {
  if (currentLevel == 3) {
    if (playingSO) {
      countSO++;
    }
    level3FrameCount++;
    // triggers sound overload - stop movement
    if (level3FrameCount > floor(randomSO) - 2) {
      if (!SOSound.isPlaying()) {
        if (headphonesStage == 1) {
          SOSound.setVolume(0.5);
        } else if (headphonesStage == 2) {
          SOSound.setVolume(0.1);
        } else {
          SOSound.setVolume(1);
        }
        SOSound.play();
      }
      console.log("play sound");
      firstSO = true;
      playingSO = true;
      // when this happens, stop movement and switch to the other sprite
      if (headphonesStage == 0) {
        stageDuration = 300;
      } else if (headphonesStage == 1) {
        stageDuration = 150;
      } else if (headphonesStage == 2) {
        stageDuration = 0;
      }

      if (countSO < stageDuration) {
        stopMoveSO = true;
      }
    }
    if (countSO > stageDuration) {
      stopMoveSO = false;
      playingSO = false;
      countSO = 0;
      randomSO = floor(random(minRandomSO, maxRandomSO));
      level3FrameCount = 0;
    }
  }
}

let inventoryMode = false;
function inventoryDraw() {
  if (inventoryMode) {
    image(uiInventoryImage, 223, 120);
    push();
    fill(255);
    textAlign(CENTER);
    textSize(20);
    text("Inventory", width / 2, 168);
    textAlign(CORNER);

    // draw items
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 2; j++) {
        fill(200);
        //rect(j * 62 + 434, i * 62 + 225, 30, 30);
        let currentItem;
        if (inventoryArr[i * 2 + j]) {
          currentItem = inventoryArr[i * 2 + j].type;
          image(inventoryItemsImage[currentItem], j * 62 + 434, i * 62 + 225);
          fill(0);
          text(
            inventoryArr[i * 2 + j].quantity,
            j * 62 + 434 + 30,
            i * 62 + 225 + 35
          );
        }
        if (hitTest(j * 62 + 424, i * 62 + 215, 50, 50)) {
          push();
          stroke("#561900");
          strokeWeight(3);
          noFill();
          rect(j * 62 + 424, i * 62 + 215, 50, 50);
          if (mouseIsPressed && inventoryArr[i * 2 + j]) {
            invSelect = currentItem;
          }
          pop();
        }
      }
    }

    // draw focused item
    if (invSelect !== 100) {
      image(inventoryItemsImage[invSelect], 274, 227, 90, 90);
      // draw description
      fill("#561900");
      textSize(11);
      text(inventoryItemsDesc[invSelect].desc, 267, 343);

      textSize(16);
      fill("#561900");
      text(inventoryItemsDesc[invSelect].name, 269, 321);
      fill(255);
      text(inventoryItemsDesc[invSelect].name, 271, 319);
    }

    // use button
    noStroke();
    // check if can use the item, if no, gray the use button out
    // checks invarr for an item of a specific type, and returns true/false depending on if it's usable
    let isUsable = (itemType) =>
      inventoryArr.some(
        (item) => item.type === itemType && item.usable === true
      );
    // uses the item if item is usable
    if (
      (isUsable(invSelect) && invSelect !== 8) ||
      //(invSelect == 5 && health < maxHealth) ||
      (invSelect == 8 && !wearingJacket)
    ) {
      // do the health pack thing
      // if player wants to use health kit on max health, display text saying ""
      if (hitTest(264, 367, 110, 25)) {
        fill("#833312");
        if (mouseIsPressed) {
          inventoryMode = false;
          useInventoryItem(invSelect);
          if (invSelect == 5) {
            health = min(maxHealth, health + 1);
            startHealEffect();
          }
          if (invSelect == 8) {
            wearingJacket = true;
          }
          if (invSelect == 9) {
            wearingHeadphones = true;
            if (headphonesStage == 2) {
              wearStage2Headphones = true;
            }
          }
          invSelect = 100;
        }
      } else {
        fill("#561900");
      }
    } else {
      if (invSelect == 8 && wearingJacket) {
        fill(255);
        textSize(12);
        textAlign(CENTER);
        text("You are already wearing a jacket.", width / 2, 465);
      }

      fill(80);
    }

    rect(264, 367, 110, 25);
    fill(255);
    textSize(16);
    text("Use", 306, 385);
    textAlign(CENTER);
    textSize(12);
    text("Press E again to exit inventory", width / 2, 438);
    pop();
  }
}
// stores all the inventory items, using the number IDs
let inventoryArr = [{ type: 5, quantity: 2, usable: true }];

let invSelect = 100;

function hitTest(x, y, w, h) {
  return mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h;
}

// uses up an inventory item
function useInventoryItem(itemType) {
  // Find the index of the item with the given type
  let index = inventoryArr.findIndex((item) => item.type === itemType);

  // If the item exists in the inventory
  if (index !== -1) {
    inventoryArr[index].quantity -= 1; // Subtract 1 from quantity

    // If the quantity reaches 0, remove the item from the inventory
    if (inventoryArr[index].quantity <= 0) {
      inventoryArr.splice(index, 1);
    }
  }
}

let inventoryItemsDesc = [
  { name: "Flashlight", desc: "For navigating\nthe forest at night" },
  { name: "Binoculars", desc: "Handy for \nbirdwatching" },
  { name: "Sketchbook", desc: "Full of drawings from \nmany adventures" },
  { name: "Waterbottle", desc: "No more parched \nthroat for me" },
  { name: "Bunny Slippers", desc: "Fluffy slippers for \nlife!" },
  { name: "Health Pack", desc: "A kit with bandages \nto heal wounds" },
  { name: "Firewood", desc: "A dry and sturdy \ntree branch" },
  { name: "Worm", desc: "A juicy worm! The \nowls will like this" },
  { name: "Jacket", desc: "Keeps me warm \nand protected." },
  { name: "Headphones", desc: "A flimsy pair of \nold headphones" },
  { name: "Headphones", desc: "Noise cancelling \nheadphones!" },
];

function uiArrowDraw() {
  for (let i = arrows.length - 1; i >= 0; i--) {
    let arrow = arrows[i];
    arrow.update();
    arrow.draw();

    // Remove arrow when it reaches its target position
    if (arrow.reachedTarget) {
      arrows.splice(i, 1);
    }
  }
}

function drawArrow(direction, x, y) {
  arrows.push(new AnimatedArrow(direction, x, y));
}

class AnimatedArrow {
  constructor(direction, targetX, targetY) {
    this.direction = direction;
    this.targetX = targetX;
    this.targetY = targetY;
    this.speed = 5; // Movement speed
    this.reachedTarget = false;

    // Set start position based on direction
    if (direction === "UP") {
      this.x = targetX;
      this.y = targetY + 50;
    } else if (direction === "DOWN") {
      this.x = targetX;
      this.y = targetY - 50;
    } else if (direction === "LEFT") {
      this.x = targetX + 50;
      this.y = targetY;
    } else if (direction === "RIGHT") {
      this.x = targetX - 50;
      this.y = targetY;
    }
  }

  update() {
    // Move arrow towards target
    if (this.direction === "UP" && this.y > this.targetY) {
      this.y -= this.speed;
    } else if (this.direction === "DOWN" && this.y < this.targetY) {
      this.y += this.speed;
    } else if (this.direction === "LEFT" && this.x > this.targetX) {
      this.x -= this.speed;
    } else if (this.direction === "RIGHT" && this.x < this.targetX) {
      this.x += this.speed;
    } else {
      this.reachedTarget = true; // Mark as finished
    }
  }

  draw() {
    image(arrowImages[this.direction], this.x, this.y);
  }
}
