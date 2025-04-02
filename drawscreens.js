let playGame = false;
let screenLevelCompleteImage;
let screenStartImage;
let screenYouDiedImage;

let screenLevel1;
let screenLevel2;

let startScreen = true;
let gameOver = false;
let gameComplete = false;
let levelComplete = false;

function screensPreload() {
  screenLevelCompleteImage = loadImage("sprites/ui/levelcompletescreen.png");
  screenStartImage = loadImage("sprites/ui/startscreen.png");
  screenYouDiedImage = loadImage("sprites/ui/youdiedscreen.png");
  screenLevel1 = loadImage("sprites/ui/Level1Complete.png");
  screenLevel2 = loadImage("sprites/ui/Level2Complete.png");
}

function showStartScreen() {
  image(screenStartImage, 0, 0);
  if (keyIsDown(32)) {
    //playGame = true;
    startScreen = false;
    if (showCutscenes) {
      cutscene = true;
    } else {
      playGame = true;
      currentLevel = 1;
    }
  }
}

function showGameOver() {
  image(screenYouDiedImage, 0, 0);
}

function resetLevel() {
  if (currentLevel == 1) {
    playGame = false;
    // reset for next level
    objectivesCounter = 0;
    objectivesTotal = sticks.length;
    objectives = [...sticks];
    objectivesShow = new Array(sticks.length).fill(true);
    objectivesCurrent = [...sticks];
    objectivesShowCurrent = [...objectivesShow];
    roomObjectivesIndices = {
      0: [0],
      1: [1],
      2: [2, 3],
    };
    addToInventory(5);
    addToInventory(5);
    addToInventory(5);
    inventoryArr = inventoryArr.filter(
      (item) => item.type < 0 || item.type > 4
    );
  } else if (currentLevel == 2) {
    playGame = false;
    // reset stuff
    objectivesCounter = 0;
    objectivesTotal = worms.length; // replace with worms
    objectives = [...worms];
    objectivesShow = new Array(worms.length).fill(true);
    objectivesCurrent = [...worms];
    objectivesShowCurrent = [...objectivesShow];
    roomObjectivesIndices = {
      0: [0],
      1: [1],
      2: [2, 3],
    };
    addToInventory(5);
    addToInventory(5);
    addToInventory(5);
    inventoryArr = inventoryArr.filter((item) => item.type == 5);
  }
}

// sets the game status (game over, level complete or not)
// win condition
function checkGameStatus() {
  if (health <= 0) {
    playGame = false;
    gameOver = true;
  }
  if (currentLevel == 1) {
    if (objectivesCounter >= objectivesTotal) {
      if (showCutscenes) {
        levelComplete = true;
      } else {
        resetLevel();
        playGame = true;
        currentLevel = 2;
      }
    }
  } else if (currentLevel == 2) {
    if (objectivesCounter >= objectivesTotal) {
      if (showCutscenes) {
        cutscene = true;
      } else {
        resetLevel();
        playGame = true;
        currentLevel = 3;
      }
    }
  } else if (currentLevel == 3) {
    if (objectivesCounter >= objectivesTotal) {
      if (
        currentRoom == 9 &&
        playerPos.colX < 91 + 436 &&
        playerPos.colY > 172
      ) {
        playGame = false;
        cutscene = true;
      }
    }
  }
}

function levelCompleteDialogue() {
  if (levelComplete) {
    if (currentLevel == 1) {
      //drawDialogue(25, person);
      // once back to room one and approaches the house,
      if (currentRoom == 0 && playerPos.colY < 215 && playerPos.colX < 577) {
        fadingOut = true;
      }
    } else if (currentLevel == 2) {
      if (currentRoom == 9) {
        fadingOut = true;
      }
    }
  }
}

let cutscene = false;
// what changes based on the level?
// starting dialogue
// objective
// if currentLevel = 0,
/*
playGame = false;
startScreen = true;
gameOver = false;
levelComplete = false;
cutscene = false;
-
startScreen = false;
cutscene = true;
if (cutscene) {
  if currentLevel = 0 //run this code,
  once the player has reached a certain condition, set cutscene to false and playGame to true
}

if current level win condition is completed
levelcomplete = true
reset objectivescounter
when level complete is true, trigger some dialogue guiding the player back to the 
*/
let cutscenePos = { x: 284, y: 308 };
let cutsceneFrameCount = 0;
let startFrameCount = false;
let cutscene1Phase = 1;
function drawCutscene1() {
  if (skipStartCutscene) {
    cutscene = false;
    playGame = true;
    currentLevel = 1;
    facingDirection = "LEFT";
  } else {
    let directionDraw;
    spriteImage = walkImages;

    if (cutscene1Phase == 1) {
      if (!dialogueState.show && !dialogueDone[1]) {
        startDialogueBool = true;
      }
      if (startDialogueBool) {
        startDialogue(1);
        startDialogueBool = false;
      }
      image(cutsceneBgImages[0], 0, 0);
      //drawDialogue(3, person);
      // startFrameCount = true; // put this in the drawDialogue function
      if (cutscenePos.y > 163) {
        //if (cutscenePos.y > 163 && startFrameCount) {
        frameCounter++;
      }

      cutsceneFrameCount++;
      if (cutsceneFrameCount > 50 && dialogueDone[1]) {
        if (cutscenePos.x < 492) {
          facingDirection = "RIGHT";
          cutscenePos.x += 1.5;
          moving = true;
        } else if (cutscenePos.y > 163) {
          facingDirection = "UP";
          cutscenePos.y -= 1.5;
          moving = true;
        } else {
          moving = false;
          fadingOut = true;
        }
      } else {
        if (dialogueState.show) {
          drawDialogue();
        }
      }
    } else {
      image(backgroundImages[0], 0, 0);
      if (cutscenePos.x > 430 && cutsceneFrameCount > 50) {
        //if (cutscenePos.y > 163 && startFrameCount) {
        frameCounter++;
      }
      runDialogue(2);
      cutsceneFrameCount++;
      if (cutsceneFrameCount > 50 && dialogueDone[2]) {
        // && startFrameCount
        if (cutscenePos.y < 284) {
          facingDirection = "DOWN";
          cutscenePos.y += 2.5;
          moving = true;
        } else if (cutscenePos.x > 430) {
          facingDirection = "LEFT";
          cutscenePos.x -= 2.5;
          moving = true;
        } else if (!dialogueDone[3]) {
          moving = false;
          runDialogue(3);
        } else {
          cutscene = false;
          playGame = true;
          currentLevel = 1;
          dialogueDone[27] = false;
          facingDirection = "LEFT";
        }
      }
      image(groundItemsImage[3], 442, 452);
    }

    if (facingDirection == "UP") {
      directionDraw = 2;
    } else if (facingDirection == "LEFT" || facingDirection == "RIGHT") {
      directionDraw = 1;
    } else if (facingDirection == "DOWN") {
      directionDraw = 0;
    }
    if (moving) {
      if (frameCounter >= 15) {
        frameCounter = 0;
        frameIndex = (frameIndex + 1) % spriteImage[directionDraw].length;
      }
      currentFrame = spriteImage[directionDraw][frameIndex];
    } else {
      currentFrame = spriteImage[directionDraw][0];
    }

    push();
    translate(cutscenePos.x, cutscenePos.y);
    if (facingDirection == "RIGHT") {
      scale(-1, 1);
      translate(-65, 0);
    } else if (facingDirection == "UP") {
      translate(-5, 0);
    }
    image(currentFrame, 0, 0);
    fill(0, 100);
    pop();
    fadingTransition(playGame, 1);
    //rect(cutscenePos.x, cutscenePos.y, 30 + 15, 70 + 32);
  }
}
function drawCutscene2() {
  push();
  fill(0);
  rect(0, 0, width, height);
  fill(255);
  //text("press space", 200, 200);
  runDialogue(21);
  // draw the 3 dialogues
  if (dialogueDone[21]) {
    //
    fadingOut = true;
  }
  fadingTransition(playGame, 2);
  pop();
}

let specialCutscene;

function drawSpecialCutscene() {
  //temp cutscene
  // insert dialogue ehre
  //text("press space", 200, 200);
  push();
  if (dialogueState.index >= 1 && dialogueState.index <= 4) {
    fill(0);
    rect(0, 0, width, height);
  }
  if (!dialogueDone[25]) {
    runDialogue(25);
  }

  pop();
  if (dialogueDone[25]) {
    playGame = true;
    levelComplete = true;
    specialCutscene = false;
  }
}

let playCutscene1 = false;
let playCutscene2 = false;

let startDialogueBool = true;
function drawCutscene() {
  // draw cut scene depending on current level
  if (currentLevel == 0) {
    push();
    fill(0);
    rect(0, 0, width, height);
    fill(255);

    //text("level 0 cutscene\npress A to continue", width / 2, 200);
    if (dialogueDone[0]) {
      playCutscene1 = true;
      if (playCutscene1) {
        drawCutscene1();
      }
    }
    pop();
    if (startDialogueBool) {
      startDialogue(0);
      startDialogueBool = false;
    }
    if (dialogueState.show) {
      drawDialogue();
    }
  } else if (currentLevel == 1) {
    // below is temp code
    push();
    fill(0);
    rect(0, 0, width, height);
    fill(255);
    //text("level 1 cutscene\nleft click to continue", width / 2, 200);
    image(screenLevel1, 0, 0);
    if (keyIsDown(32)) {
      playCutscene2 = true;
      levelComplete = false;
    }
    if (playCutscene2) {
      drawCutscene2();
    }
    pop();
  } else if (currentLevel == 2) {
    if (specialCutscene) {
      drawSpecialCutscene();
    } else {
      // below is temp code
      push();
      fill(0);
      rect(0, 0, width, height);
      fill(255);
      text("level 2 cutscene\nleft click to continue", width / 2, 200);
      image(screenLevel2, 0, 0);
      if (keyIsDown(32)) {
        cutscene = false;
        playGame = true;
        currentLevel = 3;
        dialogueDone[27] = false;
        currentRoom = 0;
        playerPos.colX = 430;
        playerPos.colY = 284;
      }
      pop();
    }
  } else if (currentLevel == 3) {
    gameComplete = true;
    playGame = false;
  }
}

function showLevelComplete() {
  image(screenLevelCompleteImage, 0, 0);
}
