let somaCheck = false;
let qteActive = false;
let somaCheckComplete = false;
let qteLength = 10;
let currentStep = 0;
let stepStartTime;
let showHealth = false;

function drawFocusMode() {
  push();
  stroke(0);
  strokeWeight(5);
  fill(222, 114, 45);
  rect(200, 100, 400, 390);
  stroke(255);
  strokeWeight(5);
  pop();

  if (qteActive) {
    push();
    textAlign(CENTER);
    fill(102, 49, 20);
    rect(210, 160, 380, 250);
    noStroke();
    fill(255);
    textSize(35);
    text("Press the space key", width / 2, 450);
    text("Soma Check", width / 2, 140);
    imageMode(CENTER);
    image(walkImages[0][0], width / 2, height / 2, 160, 210);
    rectMode(CENTER);
    let rectHeight = map(currentStep, 0, 10, 230, 400);
    fill(50, 200, 50);
    rect(width / 2, rectHeight, 100, 6);
    pop();
  }

  if (somaCheckComplete) {
    push();
    fill(102, 49, 20);
    rect(210, 160, 380, 250);
    textAlign(CENTER);
    noStroke();
    fill(255);
    textSize(64);
    text("Soma Check\ncomplete", width / 2, height / 2 - 10);
    textSize(32);
    pop();
  }

  if (showHealth) {
    push();
    stroke(255);
    strokeWeight(5);
    fill(102, 49, 20);
    rect(210, 130, 380, 150);
    noStroke();
    imageMode(CENTER);
    image(walkImages[0][0], width / 2, height / 2 - 100, 200, 200);
    fill(0, 255, 0);
    textAlign(CENTER);
    text("Health: " + health, width / 2, 350);
    let temperatureText;
    if (temperature > 2400) {
      temperatureText = "Everything seems okay.";
    } else if (temperature > 1200) {
      temperatureText = "My hands are shivering a little...";
    } else {
      temperatureText = "Oh no! my fingertips are turning blue.";
    }
    text("Temperature: " + temperatureText, width / 2, 400);
    pop();
    freezingDraw();
    healthBarDraw();
    timeSinceSomaCheck = 0;
  }
}

function keyPressed() {
  if (keyIsDown(69) && !somaCheck) {
    // press E
    if (inventoryMode) {
      invSelect = undefined;
    }
    inventoryMode = !inventoryMode;
  } else if (keyIsDown(27)) {
    inventoryMode = false;
    invSelect = undefined;
  }

  if (!somaCheck && keyIsDown(81) && allowSomaCheck && !inventoryMode) {
    enterFocusMode();
    return;
  }

  if (somaCheck && qteActive) {
    if (keyIsDown(32)) {
      currentStep++;

      if (currentStep === qteLength) {
        qteActive = false;
        somaCheckComplete = true;
        setTimeout(() => {
          somaCheckComplete = false;
          showHealth = true;
          setTimeout(() => {
            showHealth = false;
            somaCheck = false;
          }, 3000);
        }, 1500);
      }
    }
  }
}

let somaCheckCooldown = 1500;
let timeSinceSomaCheck = 1500;
let allowSomaCheck = false;
function somaCheckCooldownCheck() {
  timeSinceSomaCheck++;
  if (timeSinceSomaCheck > somaCheckCooldown) {
    allowSomaCheck = true;
  } else {
    allowSomaCheck = false;
  }
}

function enterFocusMode() {
  somaCheck = true;
  qteActive = true;
  qteSequence = Array.from({ length: 4 }, () => floor(random(1, 6)));
  currentStep = 0;
  showHealth = false;
  somaCheckComplete = false;
}
