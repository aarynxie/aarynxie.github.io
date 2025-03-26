let backgroundImages = [];
let backgroundImagesOverlay = [];

let flashlightImage;

let stickImage;
let thornImage;

function backgroundPreload() {
  backgroundImages[0] = loadImage(
    "sprites/environment/background/room-topright.png"
  );
  backgroundImages[1] = loadImage(
    "sprites/environment/background/room-middleright.png"
  );
  backgroundImages[2] = loadImage(
    "sprites/environment/background/room-bottomright.png"
  );
  backgroundImages[5] = loadImage(
    "sprites/environment/background/room-topleft.png"
  );
  backgroundImages[4] = loadImage(
    "sprites/environment/background/room-middleleft.png"
  );
  backgroundImages[3] = loadImage(
    "sprites/environment/background/room-bottomleft.png"
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
  flashlightImage = loadImage("sprites/environment/background/flashlight.png");
  stickImage = loadImage("sprites/environment/objects/stick.png");
  thornsImage = loadImage("sprites/environment/objects/thorns.png");
}

let currentRoom = 0;
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
      currentRoom = 1;
      changingRooms = true;
    }
    // set the sticks
    sticksCurrent = sticks.slice(0, 1);
    sticksShowCurrent = sticksShow.slice(0, 1);
    // set obstacles
    obstaclesCurrent = obstacles[0];
    thornsCurrent = [{ x: 0, y: 0, w: 0, h: 0 }];
  } else if (currentRoom == 1) {
    let [direction, isChanging] = changeRoomDirection(false, true, true, false);
    changeDirection = direction;
    if (changeDirection == "UP") {
      currentRoom = 0;
      changingRooms = true;
    }
    if (changeDirection == "LEFT") {
      currentRoom = 4;
      changingRooms = true;
    }
    // set the sticks
    sticksCurrent = sticks.slice(1, 3);
    sticksShowCurrent = sticksShow.slice(1, 3);

    // set obstacles
    obstaclesCurrent = obstacles[1];
    thornsCurrent = thorns.slice(0, 2);
  } else if (currentRoom == 4) {
    let [direction, isChanging] = changeRoomDirection(
      false,
      false,
      false,
      true
    );
    changeDirection = direction;
    if (changeDirection == "RIGHT") {
      currentRoom = 1;
      changingRooms = true;
    }
    // set the sticks
    sticksCurrent = sticks.slice(3, 4);
    sticksShowCurrent = sticksShow.slice(3, 4);

    // set obstacles
    obstaclesCurrent = obstacles[2];
    thornsCurrent = thorns.slice(2, 3);
  }
  if (changingRooms) {
    roomReset();
  }
}

// checks if player is moving to the next room based on constraints
// returns direction of the move and true
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
  sticksShowCurrent = sticksShow;
}
