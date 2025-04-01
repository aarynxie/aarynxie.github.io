let dialogueArr = [
  "Erin: Those birds really did a number on our cottage.",
  "Erin: Those must be the sticks Grandma wants me to collect",
  "Erin: Those thorns looked really weird, maybe I should check on myself",
  "Erin: Oh my gosh! There's my jacket!",
];

let dialogueIndex = -1;
let showDialogue = false;
let hasClicked = false; // Prevents multiple clicks per press

function drawDialogue() {
  // let's keep the bg the same brightness
  /*
  fill(0, 150);
  rect(0, 0, width, height);*/

  // Dialogue box
  fill(255);
  rect(50, height - 200, width - 100, 150, 10);

  // Text styling
  fill(0);
  textSize(20);
  textAlign(LEFT, TOP);
  textWrap(WORD);

  // Split speaker and dialogue
  const parts = dialogueArr[dialogueIndex].split(": ");
  const speaker = parts[0] + ":";
  const message = parts.slice(1).join(": ");

  // Draw speaker name
  fill(100);
  textSize(18);
  text(speaker, 70, height - 180);

  // Draw message
  fill(0);
  textSize(20);
  text(message, 70, height - 150, width - 140, 100);

  // Draw continue prompt
  if (frameCount % 60 < 30) {
    // Blinking effect
    fill(100);
    textAlign(RIGHT);
    text("Click to continue...", width - 70, height - 110);
  }
}

function handleDialogueClick() {
  if (!hasClicked && showDialogue) {
    hasClicked = true;

    if (dialogueIndex < dialogueArr.length - 1) {
      dialogueIndex++;
    } else {
      showDialogue = false;
      dialogueIndex = -1;
    }

    setTimeout(() => (hasClicked = false), 100); // Reset click lock
  }
}

function mousePressed() {
  handleDialogueClick();
}

// Start dialogue from beginning
function startDialogue() {
  if (!showDialogue) {
    showDialogue = true;
    dialogueIndex = 0;
  }
}
