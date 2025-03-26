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
      checkDialogueTrigger();
      backgroundDrawCols();
      playerDraw();
      pop();
      temperatureCheck();
      push();
      blendMode(MULTIPLY);
      backgroundOverlay();
      backgroundFlashlight();
      pop();
      setNewRoom();
      uiDraw();
      drawDialogue();
      soundPlay();
    } else if (allowSomaCheck) {
      drawFocusMode();
    }
    somaCheckCooldownCheck();
  } else if (startScreen) {
    showStartScreen();
  } else if (gameOver) {
    showGameOver();
  } else if (levelComplete) {
    showLevelComplete();
  }
}
