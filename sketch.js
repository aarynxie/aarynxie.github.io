// for debugging
let currentRoom = 0;
let playerSpeed = 2.5;
let showCutscenes = true;
let debuggingHitboxes = false;
let transitions = true; // fade in fade out
let currentLevel = 0;
let skipStartCutscene = true;
let hitboxesOn = true;

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
    currentLevel = 3;
    inventoryMode = true;
  }
  if (currentLevel == 3) {
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
  }
}

function draw() {
  if (playGame) {
    if (!somaCheck) {
      checkGameStatus();

      backgroundDraw();
      push();
      playerSetup();
      if (!dialogueState.show) {
        playerMove();
      }
      //checkDialogueTrigger();
      setNewRoom(); // if something breaks move this to line 50
      backgroundDrawCols();
      playerDraw();
      pop();
      temperatureCheck();
      soundOverload();
      push();
      backgroundOverlay();
      blendMode(MULTIPLY);
      backgroundFlashlight();
      pop();
      if (dialogueState.show) {
        drawDialogue();
      }
      uiDraw();
      levelCompleteDialogue();
      soundPlay();
    } else if (allowSomaCheck) {
      drawFocusMode();
    }
    somaCheckCooldownCheck();
    dialogueChecks();
    if (transitions) {
      fadingTransition(playGame, 0);
    }
  } else if (startScreen) {
    showStartScreen();
  } else if (gameOver) {
    showGameOver();
  } else if (gameComplete) {
    showLevelComplete();
  } else if (cutscene) {
    drawCutscene();
    if (dialogueState.show) {
      drawDialogue();
    }
    soundPlay();
  }
}
