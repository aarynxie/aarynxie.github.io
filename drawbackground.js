let backgroundImages = [];
let backgroundImagesOverlay = [];

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
      currentRoom = 2;
      changingRooms = true;
    }
    // set the sticks
    sticksCurrent = sticks.slice(0, 1);
    sticksShowCurrent = sticksShow.slice(0, 1);
    // set obstacles
    obstaclesCurrent = obstacles[0];
    thornsCurrent = [{ x: 0, y: 0, w: 0, h: 0 }];
  } else if (currentRoom == 1) {
    let [direction, isChanging] = changeRoomDirection(true, false, false, true); //down, up, left, right
    changeDirection = direction;
    if (changeDirection == "RIGHT") {
      currentRoom = 2;
      changingRooms = true;
    }
    if (changeDirection == "DOWN") {
      currentRoom = 4;
      changingRooms = true;
    }
    // set the sticks
    sticksCurrent = sticks.slice(1, 3);
    sticksShowCurrent = sticksShow.slice(1, 3);

    // set obstacles
    obstaclesCurrent = obstacles[1];
    thornsCurrent = thorns.slice(0, 2);
  } else if (currentRoom == 2) {
    let [direction, isChanging] = changeRoomDirection(true, true, true, true); //down, up, left, right
    changeDirection = direction;
    if (changeDirection == "UP") {
      currentRoom = 0;
      changingRooms = true;
    }
    if (changeDirection == "LEFT") {
      currentRoom = 1;
      changingRooms = true;
    }
    if (changeDirection == "RIGHT") {
      currentRoom = 3;
      changingRooms = true;
    }
    if (changeDirection == "DOWN") {
      currentRoom = 5;
      changingRooms = true;
    }
  } else if (currentRoom == 3) {
    let [direction, isChanging] = changeRoomDirection(true, false, true, false); //down, up, left, right
    changeDirection = direction;
    if (changeDirection == "LEFT") {
      currentRoom = 2;
      changingRooms = true;
    }
    if (changeDirection == "DOWN") {
      currentRoom = 6;
      changingRooms = true;
    }
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
      currentRoom = 5;
      changingRooms = true;
    }
    if (changeDirection == "UP") {
      currentRoom = 1;
      changingRooms = true;
    }
    if (changeDirection == "DOWN") {
      currentRoom = 8;
      changingRooms = true;
    }
    // set the sticks
    sticksCurrent = sticks.slice(3, 4);
    sticksShowCurrent = sticksShow.slice(3, 4);

    // set obstacles
    obstaclesCurrent = obstacles[2];
    thornsCurrent = thorns.slice(2, 3);
  } else if (currentRoom == 5) {
    let [direction, isChanging] = changeRoomDirection(false, true, true, true); //down, up, left, right
    changeDirection = direction;
    if (changeDirection == "UP") {
      currentRoom = 2;
      changingRooms = true;
    }
    if (changeDirection == "LEFT") {
      currentRoom = 4;
      changingRooms = true;
    }
    if (changeDirection == "RIGHT") {
      currentRoom = 6;
      changingRooms = true;
    }
  } else if (currentRoom == 6) {
    let [direction, isChanging] = changeRoomDirection(false, true, true, false); //down, up, left, right
    changeDirection = direction;
    if (changeDirection == "LEFT") {
      currentRoom = 5;
      changingRooms = true;
    }
    if (changeDirection == "UP") {
      currentRoom = 3;
      changingRooms = true;
    }
  } else if (currentRoom == 7) {
    let [direction, isChanging] = changeRoomDirection(true, false, false, true); //down, up, left, right
    changeDirection = direction;
    if (changeDirection == "DOWN") {
      currentRoom = 9;
      changingRooms = true;
    }
    if (changeDirection == "RIGHT") {
      currentRoom = 8;
      changingRooms = true;
    }
  } else if (currentRoom == 8) {
    let [direction, isChanging] = changeRoomDirection(true, true, true, false); //down, up, left, right
    changeDirection = direction;
    if (changeDirection == "DOWN") {
      currentRoom = 10;
      changingRooms = true;
    }
    if (changeDirection == "LEFT") {
      currentRoom = 7;
      changingRooms = true;
    }
    if (changeDirection == "UP") {
      currentRoom = 4;
      changingRooms = true;
    }
  } else if (currentRoom == 9) {
    let [direction, isChanging] = changeRoomDirection(false, true, false, true); //down, up, left, right
    changeDirection = direction;
    if (changeDirection == "RIGHT") {
      currentRoom = 10;
      changingRooms = true;
    }
    if (changeDirection == "UP") {
      currentRoom = 7;
      changingRooms = true;
    }
  } else if (currentRoom == 10) {
    let [direction, isChanging] = changeRoomDirection(false, true, true, false); //down, up, left, right
    changeDirection = direction;
    if (changeDirection == "LEFT") {
      currentRoom = 9;
      changingRooms = true;
    }
    if (changeDirection == "UP") {
      currentRoom = 8;
      changingRooms = true;
    }
  }
  if (changingRooms) {
    fadingIn = true;
    roomReset();
  }
}
let nextRoom;

function fadingTransition() {
  if (fadingIn) {
    alphaValue += 2; // Slow fade-in
    if (alphaValue >= 255) {
      alphaValue = 255;
      fadingIn = false; // Stop fade-in
    }
  }
  // Handle Fade-Out Effect
  if (fadingOut) {
    alphaValue -= 2; // Slow fade-out
    if (alphaValue <= 0) {
      alphaValue = 0;
      fadingOut = false;

      // Change game state after fade-out completes
      if (gameState === "playing") {
        gameState = "gameOver";
        fadingIn = true; // Start fade-in for new state
      } else if (gameState === "gameOver") {
        gameState = "menu"; // Properly reset to menu
        alphaValue = 0; // Reset opacity for menu fade-in
        fadingIn = true; // Start fade-in effect for menu
      }
    }
  }
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
  sticksShowCurrent = sticksShow;
}
