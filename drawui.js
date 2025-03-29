let uiStickBarImage;
let uiHealthBarImage;
let uiAbilitiesBarImage;
let freezingImage;
let fontRegular;
let fontBold;
let uiInventoryImage;
let inventoryItemsImage = [];

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
  inventoryItemsImage[7] = loadImage("sprites/ui/inventory/headphones-1.png");
}

let stickBarText;
function uiDraw() {
  stickBarDraw();
  abilitiesBarDraw();
  healthBarDraw();
  inventoryDraw();
}

function stickBarDraw() {
  push();
  image(uiStickBarImage, 690, 10, 100, 49);
  stickBarText = objectivesCounter + "/" + objectivesTotal;
  textSize(20);
  text(stickBarText, 745, 40);
  pop();
}

function healthBarDraw() {
  image(uiHealthBarImage, 10, 10);
  push();
  fill("#a43131");
  noStroke();
  let healthWidth = map(health, 0, 4, 0, 126);
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
  updateInventory();
  if (inventoryMode) {
    image(uiInventoryImage, 223, 120);
    push();
    fill(255);
    textAlign(CORNER);
    textSize(20);
    text("Inventory", 357, 168);

    // use button
    noStroke();
    // check if can use the item, if no, gray the use button out
    if (hitTest(264, 367, 110, 25)) {
      fill("#833312");
      if (mouseIsPressed) {
        inventoryMode = false;
        // do the action
      }
    } else {
      fill("#561900");
    }

    rect(264, 367, 110, 25);
    fill(255);
    textSize(16);
    text("Use", 306, 385);

    // draw items
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 2; j++) {
        fill(200);
        //rect(j * 62 + 434, i * 62 + 225, 30, 30);
        if (inventoryArr[i * 2 + j]) {
          let currentItem = inventoryArr[i * 2 + j].type;
          image(inventoryItemsImage[currentItem], j * 62 + 434, i * 62 + 225);
        }
      }
    }
    pop();
  }
}
// stores all the inventory items, using the number IDs
let inventoryArr = [{ type: 5, quantity: 1 }];
let inventoryArrHealth = [{ type: 5, quantity: 1 }];

function updateInventory() {
  //inventoryArr = inventoryArrHealth.concat(inventoryArrObjectives);
}

function hitTest(x, y, w, h) {
  return mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h;
}
