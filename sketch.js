// for debugging
let currentRoom = 0;
let playerSpeed = 10;

function preload() {
  backgroundPreload();
  playerPreload();
  uiPreload();
  screensPreload();
  soundPreload();
}

function setup() {
  createCanvas(800, 600);
  initializeCols();
  soundSetup();
}

function draw() {
  if (playGame) {
    if (!somaCheck) {
      checkGameStatus();

      backgroundDraw();
      push();
      playerSetup();
      if (!showDialogue) {
        playerMove();
      }
      //checkDialogueTrigger();
      backgroundDrawCols();
      playerDraw();
      pop();
      temperatureCheck();
      push();
      blendMode(MULTIPLY);
      //backgroundOverlay();
      //backgroundFlashlight();
      pop();
      setNewRoom();
      uiDraw();
      //drawDialogue();
      soundPlay();
      healthBarDraw();
    } else if (allowSomaCheck) {
      drawFocusMode();
    }
    somaCheckCooldownCheck();
    fadingTransition();
  } else if (startScreen) {
    showStartScreen();
  } else if (gameOver) {
    showGameOver();
  } else if (levelComplete) {
    showLevelComplete();
  }
}
