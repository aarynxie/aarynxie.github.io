let backgroundImages = [];
let backgroundImagesOverlay = [];
let cutsceneBgImages = [];
let groundItemsImage = [];

let envObjImage = [];

let flashlightImage;

let stickImage;
let thornImage;
let wormImage;

let headphonesImage = [];
let jacketImage;

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
    "sprites/environment/background/level/level 2 multiply.png"
  );
  backgroundImagesOverlay[1] = loadImage(
    "sprites/environment/background/level/level 2 overlay.png"
  );
  backgroundImagesOverlay[2] = loadImage(
    "sprites/environment/background/level/level 3 multiply.png"
  );
  backgroundImagesOverlay[3] = loadImage(
    "sprites/environment/background/level/level 3 overlay.png"
  );
  envObjImage[0] = loadImage("sprites/environment/objects/tree_big.png");
  envObjImage[1] = loadImage("sprites/environment/objects/tree_small.png");
  envObjImage[2] = loadImage("sprites/environment/objects/bush_big.png");
  envObjImage[3] = loadImage("sprites/environment/objects/bush_small.png");
  envObjImage[4] = loadImage("sprites/environment/objects/rock_big.png");
  envObjImage[5] = loadImage("sprites/environment/objects/rock_medium.png");
  envObjImage[6] = loadImage("sprites/environment/objects/rock_small.png");
  envObjImage[7] = loadImage("sprites/environment/objects/owl tree.png");
  flashlightImage = loadImage("sprites/environment/background/flashlight.png");
  stickImage = loadImage("sprites/environment/objects/stick.png");
  thornsImage = loadImage("sprites/environment/objects/thorns.png");
  wormImage = loadImage("sprites/environment/objects/worm.png");
  jacketImage = loadImage("sprites/environment/objects/jacket.png");

  headphonesImage[0] = loadImage(
    "sprites/environment/objects/headphones-1.png"
  );
  headphonesImage[1] = loadImage(
    "sprites/environment/objects/headphones-2.png"
  );

  groundItemsImage[0] = loadImage("sprites/environment/objects/flashlight.png");
  groundItemsImage[1] = loadImage("sprites/environment/objects/binoculars.png");
  groundItemsImage[2] = loadImage("sprites/environment/objects/sketchbook.png");
  groundItemsImage[3] = loadImage(
    "sprites/environment/objects/waterbottle.png"
  );
  groundItemsImage[4] = loadImage(
    "sprites/environment/objects/bunnyslippers.png"
  );

  cutsceneBgImages[0] = loadImage(
    "sprites/environment/background/level/levels-1-1.png"
  );
}

function backgroundDraw() {
  image(backgroundImages[currentRoom], 0, 0);
  if (currentLevel == 2) {
    level2FrameCount++;
  }
}

let level2FrameCount = 0;

function backgroundOverlay() {
  if (currentLevel == 2) {
    blendMode(OVERLAY);
    image(backgroundImagesOverlay[1], 0, 0);
    tint(255, map(level2FrameCount, 600, 5000, 0, 255));
    imageMode(MULTIPLY);
    image(backgroundImagesOverlay[0], 0, 0);
  } else if (currentLevel == 3) {
    blendMode(OVERLAY);
    image(backgroundImagesOverlay[3], 0, 0);
    blendMode(MULTIPLY);
    tint(255, 170);
    image(backgroundImagesOverlay[2], 0, 0);
  }
  /*
  push();
  if (currentRoom == 0) {
    blendMode(ADD);
    tint(255, 127);
    image(backgroundImagesOverlay[6], 0, 0);
  }
  pop();*/
}

function backgroundFlashlight() {
  if (currentLevel == 3) {
    image(flashlightImage, playerPos.x - 1196, playerPos.y - 930, 2400, 1920);
  }
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
    if (currentLevel == 1) {
      objS = 0;
      objE = 1;
    } else if (currentLevel == 2 || currentLevel == 3) {
      objS = 0;
      objE = 0;
    }
    roomSetup(0, 0, 0, objS, objE, 0, 0, 0, 0); //room number, thornStart, thornEnd
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
    if (currentLevel == 1) {
      objS = 1;
      objE = 2;
    } else if (currentLevel == 2 || currentLevel == 3) {
      objS = 0;
      objE = 0;
    }
    roomSetup(1, 0, 1, objS, objE, 0, 1, 0, 0); //room number, thornStart, thornEnd
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
    if (currentLevel == 1) {
      objS = 2;
      objE = 4;
    } else if (currentLevel == 2 || currentLevel == 3) {
      objS = 0;
      objE = 0;
    }
    roomSetup(2, 1, 2, objS, objE, 0, 0, 0, 0); //room number
  } else if (currentRoom == 3) {
    let [direction, isChanging] = changeRoomDirection(true, false, true, false); //down, up, left, right
    if (currentLevel == 1) {
      [direction, isChanging] = changeRoomDirection(false, false, true, false); //down, up, left, right
      if (playerPos.colY + 75 > height && !dialogueDone[15]) {
        runDialogue(15);
      }
    }
    changeDirection = direction;
    if (changeDirection == "LEFT") {
      nextRoom = 2;
    }
    if (changeDirection == "DOWN") {
      nextRoom = 6;
    }
    changingRooms = isChanging;
    if (currentLevel == 1) {
      objS = 4;
      objE = 5;
    } else if (currentLevel == 2) {
      objS = 0;
      objE = 0;
    } else if (currentLevel == 3) {
      objS = 0;
      objE = 1;
    }
    roomSetup(3, 2, 3, objS, objE, 0, 0, 0, 0);
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
    if (currentLevel == 1) {
      objS = 0;
      objE = 0;
    } else if (currentLevel == 2) {
      objS = 0;
      objE = 1;
    } else if (currentLevel == 3) {
      objS = 1;
      objE = 2;
    }
    roomSetup(4, 3, 5, objS, objE, 1, 2, 0, 0); //roomNum, thornStart, thornEnd, objStart, objEnd
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
    if (currentLevel == 1) {
      objS = 0;
      objE = 0;
    } else if (currentLevel == 2) {
      objS = 1;
      objE = 2;
    } else if (currentLevel == 3) {
      objS = 0;
      objE = 0;
    }
    roomSetup(5, 5, 8, objS, objE, 0, 0, 0, 0); //roomNum, thornStart, thornEnd, objStart, objEnd
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

    if (currentLevel == 1) {
      objS = 0;
      objE = 0;
    } else if (currentLevel == 2) {
      objS = 2;
      objE = 3;
    } else if (currentLevel == 3) {
      objS = 0;
      objE = 0;
    }
    roomSetup(6, 8, 11, objS, objE, 0, 0, 0, 1); //roomNum, thornStart, thornEnd, objStart, objEnd
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
    if (currentLevel == 1) {
      objS = 0;
      objE = 0;
    } else if (currentLevel == 2) {
      objS = 0;
      objE = 0;
    } else if (currentLevel == 3) {
      objS = 2;
      objE = 3;
    }
    roomSetup(7, 11, 13, objS, objE, 0, 0, 1, 2); //roomNum, thornStart, thornEnd, objStart, objEnd
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
    if (currentLevel == 1) {
      objS = 0;
      objE = 0;
    } else if (currentLevel == 2) {
      objS = 3;
      objE = 4;
    } else if (currentLevel == 3) {
      objS = 3;
      objE = 4;
    }
    roomSetup(8, 13, 15, objS, objE, 0, 0, 0, 0); //roomNum, thornStart, thornEnd, objStart, objEnd
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
    if (currentLevel == 1) {
      objS = 0;
      objE = 0;
    } else if (currentLevel == 2) {
      objS = 4;
      objE = 5;
    } else if (currentLevel == 3) {
      objS = 0;
      objE = 0;
    }
    roomSetup(9, 15, 17, objS, objE, 0, 0, 0, 0); //roomNum, thornStart, thornEnd, objStart, objEnd,
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
    if (currentLevel == 1) {
      objS = 0;
      objE = 0;
    } else if (currentLevel == 2) {
      objS = 0;
      objE = 0;
    } else if (currentLevel == 3) {
      objS = 4;
      objE = 5;
    }
    roomSetup(10, 17, 19, objS, objE, 2, 3, 2, 3); //roomNum, thornStart, thornEnd, objStart, objEnd, jacketStart, jacketEnd
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
let objS;
let objE;

function roomSetup(
  roomNum,
  thornStart,
  thornEnd,
  objStart,
  objEnd,
  jacketStart,
  jacketEnd,
  headphonesStart,
  headphonesEnd
) {
  obstaclesCurrent = obstacles[roomNum];
  envObjCurrent = envObj[roomNum];
  thornsCurrent = thorns.slice(thornStart, thornEnd);
  objectivesCurrent = objectives.slice(objStart, objEnd);
  objectivesShowCurrent = objectivesShow.slice(objStart, objEnd);

  jacketsCurrent = jackets.slice(jacketStart, jacketEnd);
  jacketsShowCurrent = jacketsShow.slice(jacketStart, jacketEnd);

  headphonesCurrent = headphones.slice(headphonesStart, headphonesEnd);
  headphonesShowCurrent = headphonesShow.slice(headphonesStart, headphonesEnd);

  if (currentLevel == 1) {
    roomObjectivesIndices = {
      0: [0], // Room 0 affects index 0
      1: [1], // Room 1 affects indices 1 and 2 separately
      2: [2, 3],
      3: [4],
    };
  } else if (currentLevel == 2) {
    roomObjectivesIndices = Object.fromEntries(
      Array.from({ length: 11 }, (_, i) => [i, []])
    );

    // Manually assign the indices that should have values
    roomObjectivesIndices[4] = [0];
    roomObjectivesIndices[5] = [1];
    roomObjectivesIndices[6] = [2];
    roomObjectivesIndices[8] = [3];
    roomObjectivesIndices[9] = [4];
  } else if (currentLevel == 3) {
    roomObjectivesIndices = Object.fromEntries(
      Array.from({ length: 11 }, (_, i) => [i, []])
    );

    // Manually assign the indices that should have values
    roomObjectivesIndices[3] = [0];
    roomObjectivesIndices[4] = [1];
    roomObjectivesIndices[7] = [2];
    roomObjectivesIndices[8] = [3];
    roomObjectivesIndices[10] = [4];
  }
}
let fadeSpeed;
let fadeMax;
function fadingTransition(boolean, cutsceneNo) {
  if (cutsceneNo == 1) {
    fadeSpeed = 5;
    fadeMax = 400;
  } else {
    fadeSpeed = 15;
    fadeMax = 255;
  }
  if (fadingIn) {
    alphaValue -= fadeSpeed;
    if (alphaValue <= 0) {
      alphaValue = 0;
      fadingIn = false;
    }
  }
  // Handle Fade-Out Effect
  if (fadingOut) {
    alphaValue += fadeSpeed;
    if (alphaValue >= fadeMax) {
      alphaValue = 255;
      fadingOut = false;

      // Change game state after fade-out completes

      fadingIn = true; // Start fade-in for new state
      if (currentLevel == 2 && levelComplete && currentRoom == 9) {
        cutscene = true;
        resetLevel();
        facingDirection = "DOWN";
      }
      if (cutsceneNo == 2) {
        cutscene = false;
        playGame = true;
        currentLevel = 2;
        facingDirection = "DOWN";
        // set variable to show level 2 starting dialogue
      } else if (
        currentLevel == 1 &&
        levelComplete &&
        currentRoom == 0 &&
        playerPos.colY < 215 &&
        playerPos.colX < 577
      ) {
        cutscene = true;
        resetLevel();
      } else if (boolean) {
        currentRoom = nextRoom;
        roomReset();
      } else if (cutsceneNo == 1 && cutscene1Phase == 1) {
        cutsceneFrameCount = 0;
        cutscene1Phase = 2;
        facingDirection = "DOWN";
      }
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
