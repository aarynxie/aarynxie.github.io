let backgroundImages = [];
let backgroundImagesOverlay = [];

let envObjImage = [];

let flashlightImage;

let stickImage;
let thornImage;

function backgroundPreload() {
  backgroundImages[0] = loadImage(
    "sprites/environment/background/level/levels-1.png"
  );
  backgroundImages[1] = loadImage(
    "sprites/environment/background/level/levels-2.png"
  );
  backgroundImages[2] = loadImage(
    "sprites/environment/background/level/levels-3.png"
  );
  backgroundImages[3] = loadImage(
    "sprites/environment/background/level/levels-4.png"
  );
  backgroundImages[4] = loadImage(
    "sprites/environment/background/level/levels-5.png"
  );
  backgroundImages[5] = loadImage(
    "sprites/environment/background/level/levels-6.png"
  );
  backgroundImages[6] = loadImage(
    "sprites/environment/background/level/levels-7.png"
  );
  backgroundImages[7] = loadImage(
    "sprites/environment/background/level/levels-8.png"
  );
  backgroundImages[8] = loadImage(
    "sprites/environment/background/level/levels-9.png"
  );
  backgroundImages[9] = loadImage(
    "sprites/environment/background/level/levels-10.png"
  );
  backgroundImages[10] = loadImage(
    "sprites/environment/background/level/levels-11.png"
  );
  backgroundImagesOverlay[0] = loadImage(
    "sprites/environment/background/room-topright-overlay.png"
  );
  backgroundImagesOverlay[1] = loadImage(
    "sprites/environment/background/room-middleright-overlay.png"
  );
  backgroundImagesOverlay[2] = loadImage(
    "sprites/environment/background/room-bottomright-overlay.png"
  );
  backgroundImagesOverlay[5] = loadImage(
    "sprites/environment/background/room-bottomright-overlay.png"
  );
  backgroundImagesOverlay[4] = loadImage(
    "sprites/environment/background/room-middleleft-overlay.png"
  );
  backgroundImagesOverlay[3] = loadImage(
    "sprites/environment/background/room-bottomleft-overlay.png"
  );
  backgroundImagesOverlay[6] = loadImage(
    "sprites/environment/background/room-topright-overlay2.png"
  );
  envObjImage[0] = loadImage("sprites/environment/objects/tree_big.png");
  envObjImage[1] = loadImage("sprites/environment/objects/tree_small.png");
  envObjImage[2] = loadImage("sprites/environment/objects/bush_big.png");
  envObjImage[3] = loadImage("sprites/environment/objects/bush_small.png");
  envObjImage[4] = loadImage("sprites/environment/objects/rock_big.png");
  envObjImage[5] = loadImage("sprites/environment/objects/rock_medium.png");
  envObjImage[6] = loadImage("sprites/environment/objects/rock_small.png");
  flashlightImage = loadImage("sprites/environment/background/flashlight.png");
  stickImage = loadImage("sprites/environment/objects/stick.png");
  thornsImage = loadImage("sprites/environment/objects/thorns.png");
}

function backgroundDraw() {
  image(backgroundImages[currentRoom], 0, 0);
}

function backgroundOverlay() {
  image(backgroundImagesOverlay[currentRoom], 0, 0);
  push();
  if (currentRoom == 0) {
    blendMode(ADD);
    tint(255, 127);
    image(backgroundImagesOverlay[6], 0, 0);
  }
  pop();
}

function backgroundFlashlight() {
  image(flashlightImage, playerPos.x - 1196, playerPos.y - 930, 2400, 1920);
}

let changeDirection;
let changingRooms = false;

// define how the room is going to change based on the current room
function setNewRoom() {
  if (currentRoom == 0) {
    let [direction, isChanging] = changeRoomDirection(
      true,
      false,
      false,
      false
    );
    changeDirection = direction;
    if (changeDirection == "DOWN") {
      nextRoom = 2;
    }
    changingRooms = isChanging;

    // set obstacles, thorns, objectives
    roomSetup(0, 0, 0, 0, 1); //room number, thornStart, thornEnd
  } else if (currentRoom == 1) {
    let [direction, isChanging] = changeRoomDirection(true, false, false, true); //down, up, left, right
    changeDirection = direction;
    if (changeDirection == "RIGHT") {
      nextRoom = 2;
    }
    if (changeDirection == "DOWN") {
      nextRoom = 4;
    }
    changingRooms = isChanging;
    // set obstacles
    roomSetup(1, 0, 1, 1, 2); //room number, thornStart, thornEnd
  } else if (currentRoom == 2) {
    let [direction, isChanging] = changeRoomDirection(true, true, true, true); //down, up, left, right
    changeDirection = direction;
    if (changeDirection == "UP") {
      nextRoom = 0;
    }
    if (changeDirection == "LEFT") {
      nextRoom = 1;
    }
    if (changeDirection == "RIGHT") {
      nextRoom = 3;
    }
    if (changeDirection == "DOWN") {
      nextRoom = 5;
    }
    changingRooms = isChanging;
    roomSetup(2, 1, 2, 2, 4); //room number
  } else if (currentRoom == 3) {
    let [direction, isChanging] = changeRoomDirection(true, false, true, false); //down, up, left, right
    changeDirection = direction;
    if (changeDirection == "LEFT") {
      nextRoom = 2;
    }
    if (changeDirection == "DOWN") {
      nextRoom = 6;
    }
    changingRooms = isChanging;
    roomSetup(3, 2, 3, 4, 5);
  } else if (currentRoom == 4) {
    let [direction, isChanging] = changeRoomDirection(
      //down, up, left, right
      true,
      true,
      false,
      true
    );
    changeDirection = direction;
    if (changeDirection == "RIGHT") {
      nextRoom = 5;
    }
    if (changeDirection == "UP") {
      nextRoom = 1;
    }
    if (changeDirection == "DOWN") {
      nextRoom = 8;
    }
    changingRooms = isChanging;
    roomSetup(4, 0, 0, 0, 0); //roomNum, thornStart, thornEnd, objStart, objEnd
    // set the sticks
    //sticksCurrent = sticks.slice(3, 4);
    //sticksShowCurrent = sticksShow.slice(3, 4);

    // set obstacles
    //thornsCurrent = thorns.slice(2, 3);
  } else if (currentRoom == 5) {
    let [direction, isChanging] = changeRoomDirection(false, true, true, true); //down, up, left, right
    changeDirection = direction;
    if (changeDirection == "UP") {
      nextRoom = 2;
    }
    if (changeDirection == "LEFT") {
      nextRoom = 4;
    }
    if (changeDirection == "RIGHT") {
      nextRoom = 6;
    }
    changingRooms = isChanging;
    roomSetup(5, 0, 0, 0, 0); //roomNum, thornStart, thornEnd, objStart, objEnd
  } else if (currentRoom == 6) {
    let [direction, isChanging] = changeRoomDirection(false, true, true, false); //down, up, left, right
    changeDirection = direction;
    if (changeDirection == "LEFT") {
      nextRoom = 5;
    }
    if (changeDirection == "UP") {
      nextRoom = 3;
    }
    changingRooms = isChanging;
    roomSetup(6, 0, 0, 0, 0); //roomNum, thornStart, thornEnd, objStart, objEnd
  } else if (currentRoom == 7) {
    let [direction, isChanging] = changeRoomDirection(true, false, false, true); //down, up, left, right
    changeDirection = direction;
    if (changeDirection == "DOWN") {
      nextRoom = 9;
    }
    if (changeDirection == "RIGHT") {
      nextRoom = 8;
    }
    changingRooms = isChanging;
    roomSetup(7, 0, 0, 0, 0); //roomNum, thornStart, thornEnd, objStart, objEnd
  } else if (currentRoom == 8) {
    let [direction, isChanging] = changeRoomDirection(true, true, true, false); //down, up, left, right
    changeDirection = direction;

    if (changeDirection == "DOWN") {
      nextRoom = 10;
    }
    if (changeDirection == "LEFT") {
      nextRoom = 7;
    }
    if (changeDirection == "UP") {
      nextRoom = 4;
    }
    changingRooms = isChanging;
    roomSetup(8, 0, 0, 0, 0); //roomNum, thornStart, thornEnd, objStart, objEnd
  } else if (currentRoom == 9) {
    let [direction, isChanging] = changeRoomDirection(false, true, false, true); //down, up, left, right
    changeDirection = direction;
    if (changeDirection == "RIGHT") {
      nextRoom = 10;
    }
    if (changeDirection == "UP") {
      nextRoom = 7;
    }
    changingRooms = isChanging;
    roomSetup(9, 0, 0, 0, 0); //roomNum, thornStart, thornEnd, objStart, objEnd
  } else if (currentRoom == 10) {
    let [direction, isChanging] = changeRoomDirection(false, true, true, false); //down, up, left, right
    changeDirection = direction;
    if (changeDirection == "LEFT") {
      nextRoom = 9;
    }
    if (changeDirection == "UP") {
      nextRoom = 8;
    }
    changingRooms = isChanging;
    roomSetup(10, 0, 0, 0, 0); //roomNum, thornStart, thornEnd, objStart, objEnd
  }
  if (changingRooms) {
    if (transitions) {
      fadingOut = true;
    } else {
      currentRoom = nextRoom;
      roomReset();
    }
  }
}
let nextRoom = 0;

function roomSetup(roomNum, thornStart, thornEnd, objStart, objEnd) {
  obstaclesCurrent = obstacles[roomNum];
  envObjCurrent = envObj[roomNum];
  thornsCurrent = thorns.slice(thornStart, thornEnd);
  objectivesCurrent = objectives.slice(objStart, objEnd);
  objectivesShowCurrent = objectivesShow.slice(objStart, objEnd);
}

function fadingTransition() {
  if (fadingIn) {
    alphaValue -= 15;
    if (alphaValue <= 0) {
      alphaValue = 0;
      fadingIn = false;
    }
  }
  // Handle Fade-Out Effect
  if (fadingOut) {
    alphaValue += 15;
    if (alphaValue >= 255) {
      alphaValue = 255;
      fadingOut = false;

      // Change game state after fade-out completes
      currentRoom = nextRoom;
      fadingIn = true; // Start fade-in for new state
      roomReset();
    }
  }
  push();
  fill(0, alphaValue);
  rect(0, 0, width, height);
  pop();
}
let fadingIn = false;
let fadingOut = false;
let alphaValue = 0;
// checks if player is moving to the next room based on their location
// returns direction of the move and true if the player is in position to go into a new room
function changeRoomDirection(down, up, left, right) {
  if (playerPos.colY + 75 > height && down) {
    return ["DOWN", true];
  }
  if (playerPos.colY < 1 && up) {
    return ["UP", true];
  }
  if (playerPos.colX < 1 && left) {
    changingRooms = true;
    return ["LEFT", true];
  }
  if (playerPos.colX + 35 > width && right) {
    changingRooms = true;
    return ["RIGHT", true];
  }
  return ["NULL", false];
}

// runs everytime there is a new room
function roomReset() {
  if (changeDirection == "DOWN") {
    playerPos.colY = 5;
  } else if (changeDirection == "UP") {
    playerPos.colY = height - 75;
  } else if (changeDirection == "LEFT") {
    playerPos.colX = width - 35;
  } else if (changeDirection == "RIGHT") {
    playerPos.colX = 5;
  }
  changingRooms = false;
  objectivesShowCurrent = objectivesShow; // what is this doing
}
