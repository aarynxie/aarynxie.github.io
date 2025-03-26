let showDialogue = false;
let dialogueCompleted = false;
let currentTextIndex = 0;
let lastUpdateTime = 0;
const textBoxX = 100;
const textBoxY = 450;
const textBoxW = 600;
const textBoxH = 100;
const dialogueText =
  "This must be one of the sticks my grandma was talking about, let's see if I can find more (left click to continue)";
const textSpeed = 40; // Characters per second

function checkDialogueTrigger() {
  if (dialogueCompleted || currentRoom !== 0) return;

  // First stick should be index 0 in your sticks array
  const firstStick = sticks[0];

  let playerNear =
    playerPos.colX > firstStick.x - 100 &&
    playerPos.colX < firstStick.x + firstStick.w + 100 &&
    playerPos.colY > firstStick.y - 100 &&
    playerPos.colY < firstStick.y + firstStick.h + 100;

  if (playerNear && !showDialogue) {
    showDialogue = true;
    currentTextIndex = 0;
    lastUpdateTime = millis();
  }
}

function drawDialogue() {
  if (!showDialogue) return;

  // Typewriter animation
  if (currentTextIndex < dialogueText.length) {
    if (millis() - lastUpdateTime > 1000 / textSpeed) {
      currentTextIndex++;
      lastUpdateTime = millis();
    }
  }

  // Draw text box
  push();
  fill("#DE722D");
  stroke(0);
  strokeWeight(2);
  rect(textBoxX, textBoxY, textBoxW, textBoxH, 10);

  // Draw text
  fill(0);
  noStroke();
  textSize(20);
  textAlign(LEFT, TOP);
  text(
    dialogueText.substring(0, currentTextIndex),
    textBoxX + 20,
    textBoxY + 20,
    textBoxW - 40,
    textBoxH - 40
  );
  pop();
}

function mousePressed() {
  // Add this condition:
  if (showDialogue && currentTextIndex >= dialogueText.length) {
    showDialogue = false;
    dialogueCompleted = true;
  }
}
