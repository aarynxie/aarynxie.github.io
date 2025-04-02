// Game State Variables
let somaCheck = false;
let qteActive = false;
let somaCheckComplete = false;
let showHealth = false;
let allowSomaCheck = false;
let canExitSomaCheck = false;
let isHoldingSpace = false;

// Timing & Progress
let holdStartTime = 0;
let holdDuration = 0;
const somaCheckCooldown = 1500;
let timeSinceSomaCheck = 1500;
const qteLength = 10;

// Health System

let circleSize = 40;
let imageX, imageY;

// Popup System
let showHealthPopup = false;
let popupType = "";
const popupWidth = 300;
const popupHeight = 200;

function mousePressed() {
  if (showHealth) handleHealthCircleClicks();
  if (showHealthPopup) handlePopupClose();
}

function drawFocusMode() {
  // Main container
  push();
  stroke(0);
  strokeWeight(5);
  fill(222, 114, 45);
  rect(200, 100, 400, 390);
  stroke(255);
  strokeWeight(5);
  pop();

  if (qteActive) drawQTE();
  if (somaCheckComplete) drawCompletionScreen();
  if (showHealth) drawHealthScreen();
  if (showHealthPopup) drawHealthPopup();
}

function drawQTE() {
  push();
  textAlign(CENTER);
  fill(102, 49, 20);
  //rect(210, 160, 380, 250);
  //imageMode(CENTER);

  // Instructions
  noStroke();
  fill(255);
  textSize(35);
  text("Hold the space key", width / 2, 450);
  text("Soma Check", width / 2, 140);

  // Character display
  imageMode(CENTER);
  const charY = height / 2;
  image(walkImages[0][0], width / 2, charY, 160, 210);

  // Progress bar
  const progress = isHoldingSpace
    ? constrain((millis() - holdStartTime) / 2000, 0, 1)
    : 0;
  const barStartY = charY - 105;
  const barEndY = charY + 105;
  const rectHeight = map(progress, 0, 1, barStartY, barEndY);

  fill(50, 200, 50);
  rect(width / 2 - 50, rectHeight, 100, 6);
  pop();
}

function drawCompletionScreen() {
  push();
  fill(102, 49, 20);
  rect(210, 160, 380, 250);
  textAlign(CENTER);
  noStroke();
  fill(255);
  textSize(64);
  text("Soma Check\ncomplete", width / 2, height / 2 - 10);
  pop();
}

function drawHealthScreen() {
  push();
  stroke(255);
  strokeWeight(5);
  fill(102, 49, 20);
  rect(210, 160, 380, 250);

  // Character position
  imageMode(CENTER);
  imageX = width / 2;
  imageY = height / 2 - 50;
  image(walkImages[0][0], imageX, imageY, 160, 210);

  // Condition circles
  noStroke();
  if (health < maxHealth) {
    drawCircle(imageX, imageY + 90, 255, 0, 0);
  }
  if (temperature < maxTemperature) {
    drawCircle(imageX, imageY - 70, 0, 0, 255);
  }

  // Status text
  fill(0, 255, 0);
  textAlign(CENTER);
  textSize(24);
  text(`Health: ${health}`, width / 2, 350);
  text(getTemperatureText(), width / 2, 400);

  pop();
}

function drawHealthPopup() {
  push();
  // Dark overlay
  fill(0, 150);
  rect(0, 0, width, height);

  // Popup container
  fill(102, 49, 20);
  stroke(255);
  strokeWeight(3);
  const x = width / 2 - popupWidth / 2;
  const y = height / 2 - popupHeight / 2;
  rect(x, y, popupWidth, popupHeight, 10);

  // Content
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(24);
  text(getPopupText(), width / 2, height / 2 - 20);

  // Close button
  fill(222, 114, 45);
  rect(x + popupWidth - 40, y + 10, 30, 30, 5);
  fill(255);
  textSize(20);
  text("X", x + popupWidth - 25, y + 25);
  pop();
}

// Helper functions
function drawCircle(x, y, r, g, b) {
  fill(r, g, b, 100);
  ellipse(x, y, circleSize);
  if (dist(mouseX, mouseY, x, y) < circleSize / 2) {
    cursor(HAND);
  }
}

function getTemperatureText() {
  if (temperature > 2400) return "Temperature: Normal";
  if (temperature > 1200) return "Temperature: Chilly";
  return "Temperature: Critical!";
}

function getPopupText() {
  if (popupType === "leg") {
    return `Leg Injury\nHealth: ${health}/${maxHealth}\nMobility: -30%`;
  }
  return `Head Status\nTemp: ${temperature}°\nCognition: Impaired`;
}

// Input handling
function keyPressed() {
  handleInventoryToggle();
  handleSomaCheckControls();
  if (showHealthPopup && (key === "q" || key === "Q")) {
    showHealthPopup = false;
  }
}

function keyReleased() {
  if (somaCheck && qteActive && key === " ") {
    handleQTERelease();
  }
}

function mousePressed() {}

// Detailed handlers
function handleInventoryToggle() {
  if ((key === "e" || key === "E") && !somaCheck) {
    inventoryMode = !inventoryMode;
    if (inventoryMode) invSelect = 100;
  }
  if (keyCode === ESCAPE) inventoryMode = false;
}

function handleSomaCheckControls() {
  if (key === "q" || key === "Q") {
    if (!somaCheck && allowSomaCheck && !inventoryMode) {
      enterFocusMode();
    } else if (showHealth) {
      exitHealthScreen();
    }
  }
  if (somaCheck && qteActive && key === " ") {
    holdStartTime = millis();
    isHoldingSpace = true;
  }
}

function handleQTERelease() {
  isHoldingSpace = false;
  holdDuration = millis() - holdStartTime;

  if (holdDuration >= 2000) {
    completeSomaCheck();
  } else {
    resetQTE();
  }
}

function handleHealthCircleClicks() {
  if (health < maxHealth && checkCircleClick(imageX, imageY + 90)) {
    showHealthPopup = true;
    popupType = "leg";
  }
  if (temperature < maxTemperature && checkCircleClick(imageX, imageY - 70)) {
    showHealthPopup = true;
    popupType = "head";
  }
}

function handlePopupClose() {
  const x = width / 2 - popupWidth / 2;
  const y = height / 2 - popupHeight / 2;
  if (
    mouseX > x + popupWidth - 40 &&
    mouseX < x + popupWidth - 10 &&
    mouseY > y + 10 &&
    mouseY < y + 40
  ) {
    showHealthPopup = false;
  }
}

// Game logic
function enterFocusMode() {
  somaCheck = true;
  qteActive = true;
  showHealth = false;
  resetQTE();
}

function exitHealthScreen() {
  showHealth = false;
  somaCheck = false;
  timeSinceSomaCheck = 0;
  allowSomaCheck = false;
}

function completeSomaCheck() {
  qteActive = false;
  somaCheckComplete = true;
  setTimeout(() => {
    somaCheckComplete = false;
    showHealth = true;
  }, 1500);
}

function resetQTE() {
  holdStartTime = 0;
  holdDuration = 0;
}

function checkCircleClick(x, y) {
  return dist(mouseX, mouseY, x, y) < circleSize / 2;
}

function somaCheckCooldownCheck() {
  if (!somaCheck && !showHealth) timeSinceSomaCheck++;
  allowSomaCheck = timeSinceSomaCheck > somaCheckCooldown;
}

let donefirstSomaCheck = false; // NEW------
let donesecondSomaCheck = false; // NEW------
/*
function keyPressed() {
  if (keyIsDown(69) && !somaCheck && !dialogueState.show) {
    // press E
    if (inventoryMode) {
      invSelect = 100;
    }
    inventoryMode = !inventoryMode;
  } else if (keyIsDown(27)) {
    inventoryMode = false;
    invSelect = 100;
  }

  if (
    !somaCheck &&
    keyIsDown(81) &&
    allowSomaCheck &&
    !inventoryMode &&
    !dialogueState.show
  ) {
    donefirstSomaCheck = true; // NEW------
    if (dialogueDone[16]) {
      donesecondSomaCheck = true;
    }
    enterFocusMode();
    return;
  }
} */
