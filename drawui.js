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

let dialogueBgImages = [];

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
  inventoryItemsImage[8] = loadImage("sprites/ui/inventory/headphones-1.png");

  uiNewItemImage = loadImage("sprites/ui/newitem.png");
  uiHealImage = loadImage("sprites/ui/heal.png");
}

let stickBarText;
function uiDraw() {
  newItemDraw();
  abilitiesBarDraw();
  healthBarDraw();
  inventoryDraw();
}

function newItemDraw() {
  push();
  //image(uiStickBarImage, 690, 10, 100, 49);
  if (newItem !== 5) {
    drawNewItem(newItem);
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
  //console.log(newItem);
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

let temperature = 4500;

let jacket = { x: 500, y: 200, w: 50, h: 50 };
let wearingJacket = false;
function temperatureCheck() {
  if (!wearingJacket) {
    temperature--;
  } else {
    temperature = 4500;
  }
  //playerSpeed = max(0.5, map(temperature, 0, 4500, 1, 2.5));
  frameDelay = map(temperature, 0, 2500, 16, 12);

  if (currentRoom == 4) {
    push();
    jacketCol();
    if (!wearingJacket) {
      fill(200, 50, 200);
      noStroke();
      rect(jacket.x, jacket.y, jacket.w, jacket.h);
      fill(255);
      text("jacket", jacket.x, jacket.y + 20);
      pop();
    }
  }
}

function freezingDraw() {
  push();
  let freezingOpacity = map(temperature, 0, 2500, 255, 0);
  tint(255, freezingOpacity);
  image(freezingImage, 0, 0);
  pop();
}

function jacketCol() {
  let playerRect = {
    x: playerPos.colX,
    y: playerPos.colY,
    w: player.w,
    h: player.h,
  };
  let jacketRect = {
    x: jacket.x,
    y: jacket.y,
    w: jacket.w,
    h: jacket.h,
  };

  if (rectCollision(playerRect, jacketRect)) {
    wearingJacket = true;
  }
}
let inventoryMode = false;
function inventoryDraw() {
  if (inventoryMode) {
    image(uiInventoryImage, 223, 120);
    push();
    fill(255);
    textAlign(CORNER);
    textSize(20);
    text("Inventory", 357, 168);

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
          if (mouseIsPressed) {
            invSelect = currentItem;
          }
          pop();
        }
      }
    }

    // draw focused item
    //console.log(inventoryItemsDesc[0].desc);
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
      (isUsable(invSelect) && invSelect !== 5) ||
      (invSelect == 5 && health < maxHealth)
    ) {
      if (hitTest(264, 367, 110, 25)) {
        fill("#833312");
        if (mouseIsPressed) {
          inventoryMode = false;
          // invSelect is the item type, check inventoryArr, get the index of the invSelect item, subtract 1 from the quantity
          useInventoryItem(invSelect);
          invSelect = 100;
          health = min(maxHealth, health + 1);
          startHealEffect();
        }
      } else {
        fill("#561900");
      }
    } else {
      fill(80);
    }

    rect(264, 367, 110, 25);
    fill(255);
    textSize(16);
    text("Use", 306, 385);
    pop();
  }
}
// stores all the inventory items, using the number IDs
let inventoryArr = [{ type: 5, quantity: 1, usable: true }];

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
  { name: "Flashlight", desc: "Flashlight desc" },
  { name: "Binoculars", desc: "Binoculars desc" },
  { name: "Sketchbook", desc: "Sketchbook desc" },
  { name: "Waterbottle", desc: "Waterbottle desc" },
  { name: "Bunny Slippers", desc: "Slippers desc" },
  { name: "Health Pack", desc: "A kit with bandages \nand disinfectants" },
  { name: "Firewood", desc: "Firewood desc" },
  { name: "Worm", desc: "Worm desc" },
  { name: "Headphones", desc: "Headphones desc" },
];
