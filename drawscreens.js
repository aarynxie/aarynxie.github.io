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
    playGame = true;
    startScreen = false;
  }
}

function showGameOver() {
  image(screenYouDiedImage, 0, 0);
}

function checkGameStatus() {
  if (health <= 0) {
    playGame = false;
    gameOver = true;
  }
  if (sticksCounter >= sticksTotal) {
    playGame = false;
    levelComplete = true;
  }
}

function showLevelComplete() {
  image(screenLevelCompleteImage, 0, 0);
}
