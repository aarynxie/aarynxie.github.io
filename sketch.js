// for debugging
let currentRoom = 0;
let playerSpeed = 10;
let showCutscenes = true;
let debuggingHitboxes = false;
let transitions = true; // fade in fade out
let currentLevel = 0;

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
  textFont(fontRegular);
  // for debugging
  if (!showCutscenes) {
    startScreen = false;
    playGame = true;
    currentLevel = 1;
    inventoryMode = true;
  }
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
      setNewRoom(); // if something breaks move this to line 50
      backgroundDrawCols();
      playerDraw();
      pop();
      temperatureCheck();
      push();
      blendMode(MULTIPLY);
      //backgroundOverlay();
      //backgroundFlashlight();
      pop();

      uiDraw();
      //drawDialogue();
      soundPlay();
    } else if (allowSomaCheck) {
      drawFocusMode();
    }
    somaCheckCooldownCheck();
    if (transitions) {
      fadingTransition(playGame, 0);
    }
  } else if (startScreen) {
    showStartScreen();
  } else if (gameOver) {
    showGameOver();
  } else if (levelComplete) {
    showLevelComplete();
  } else if (cutscene) {
    drawCutscene();
  }
}
