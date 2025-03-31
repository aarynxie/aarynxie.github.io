let playGame = false;
let screenLevelCompleteImage;
let screenStartImage;
let screenYouDiedImage;

let startScreen = true;
let gameOver = false;
let levelComplete = false;

function screensPreload() {
  screenLevelCompleteImage = loadImage("sprites/ui/levelcompletescreen.png");
  screenStartImage = loadImage("sprites/ui/startscreen.png");
  screenYouDiedImage = loadImage("sprites/ui/youdiedscreen.png");
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

// sets the game status (game over, level complete or not)
function checkGameStatus() {
  if (health <= 0) {
    playGame = false;
    gameOver = true;
  }
  if (currentLevel == 1) {
    if (objectivesCounter >= objectivesTotal) {
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
      inventoryArr = inventoryArr.filter(
        (item) => item.type < 0 || item.type > 4
      );
      if (showCutscenes) {
        cutscene = true; // instead of setting to true, set game status to complete?
      } else {
        playGame = true;
        currentLevel = 2;
      }
    }
  } else if (currentLevel == 2) {
    if (objectivesCounter >= objectivesTotal) {
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
      if (showCutscenes) {
        cutscene = true;
      } else {
        playGame = true;
        currentLevel = 3;
      }
    }
  } else if (currentLevel == 3) {
    if (objectivesCounter >= objectivesTotal) {
      // congrats!!
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
  let directionDraw;
  spriteImage = walkImages;

  if (cutscene1Phase == 1) {
    image(cutsceneBgImages[0], 0, 0);
    //drawDialogue(3, person);
    // startFrameCount = true; // put this in the drawDialogue function
    if (cutscenePos.y > 163) {
      //if (cutscenePos.y > 163 && startFrameCount) {
      frameCounter++;
    }

    cutsceneFrameCount++;
    if (cutsceneFrameCount > 50) {
      if (cutscenePos.x < 492) {
        facingDirection = "RIGHT";
        cutscenePos.x += 1.5;
        moving = true;
      } else if (cutscenePos.y > 163) {
        facingDirection = "UP";
        cutscenePos.y -= 1.5;
        moving = true;
      } else {
        fadingOut = true;
      }
    }
  } else {
    image(backgroundImages[0], 0, 0);
    if (cutscenePos.x > 430 && cutsceneFrameCount > 50) {
      //if (cutscenePos.y > 163 && startFrameCount) {
      frameCounter++;
    }
    //drawDialogue(4, person);
    cutsceneFrameCount++;
    if (cutsceneFrameCount > 50) {
      // && startFrameCount
      if (cutscenePos.y < 284) {
        facingDirection = "DOWN";
        cutscenePos.y += 2.5;
        moving = true;
      } else if (cutscenePos.x > 430) {
        facingDirection = "LEFT";
        cutscenePos.x -= 2.5;
        moving = true;
      } else {
        // drawDialogue(5, person);
        // drawDialogue(6, person);
        // drawDialogue(7, person);
        // after dialogue 7 run this code
        cutscene = false;
        playGame = true;
        currentLevel = 1;
        facingDirection = "LEFT";
      }
    }
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

let playCutscene1 = false;
function drawCutscene() {
  // draw cut scene depending on current level
  if (currentLevel == 0) {
    push();
    fill(0);
    rect(0, 0, width, height);
    fill(255);
    text("level 0 cutscene\nleft click to continue", width / 2, 200);

    if (mouseIsPressed) {
      playCutscene1 = true;
    }
    if (playCutscene1) {
      drawCutscene1();
    }
    pop();
  } else if (currentLevel == 1) {
    // below is temp code
    push();
    fill(0);
    rect(0, 0, width, height);
    fill(255);
    text("level 1 cutscene\nleft click to continue", width / 2, 200);
    if (mouseIsPressed) {
      cutscene = false;
      playGame = true;
      currentLevel = 2;

      pop();
    }
  } else if (currentLevel == 2) {
    // below is temp code
    push();
    fill(0);
    rect(0, 0, width, height);
    fill(255);
    text("level 2 cutscene\nleft click to continue", width / 2, 200);
    if (mouseIsPressed) {
      cutscene = false;
      playGame = true;
      currentLevel = 3;
    }
    pop();
  } else if (currentLevel == 3) {
  }
}

function showLevelComplete() {
  image(screenLevelCompleteImage, 0, 0);
}
