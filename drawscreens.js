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
      // reset stuff
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

      if (showCutscenes) {
        cutscene = true;
      } else {
        playGame = true;
        currentLevel = 3;
      }
    }
  } else if (currentLevel == 3) {
  }
}

let currentLevel = 0;
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

function drawCutscene() {
  // draw cut scene depending on current level
  if (currentLevel == 0) {
    push();
    fill(0);
    rect(0, 0, width, height);
    fill(255);
    text("level 0 cutscene\nleft click to continue", width / 2, 200);

    if (mouseIsPressed) {
      cutscene = false;
      playGame = true;
      currentLevel = 1;
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
