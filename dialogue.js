let dialogueArr = [
  [
    "Hey grandma! Thank you so much for letting me stay at your cottage this weekend. I'll be there in 10 minutes!",
    "Of course, no problem at all, my dear. Now, I know the cold doesn't bother you, but night time at Owl Creek can get dangerously cold.",
    "Don't forget to turn on the furnace in the basement when you get there, okay? Do you have the key?",
    "Don't worry, I have it in my trusty owl backpack that you gave me! I'm pretty exhausted so I'm going to go now, but I'll call you back once I get settled in!",
  ],
];

// Dialogue system variables
let dialogueIndex = -1;
let showDialogue = false;
let hasClicked = false;
let typingActive = false;

let displayIndex = 0;
let lastTypeTime = 0;
const typingSpeed = 50; // Milliseconds per character

function drawDialogueMain() {
  if (showDialogue) {
    drawDialogue(0);
  }
}

let currentMessageArr;
let currentMessage;
function drawDialogue(dIndex) {
  let dPerson = "ERIN";
  let dialogueX = 205;
  currentMessageArr = dialogueArr[dIndex];
  currentMessage = currentMessageArr[dialogueIndex];
  if (dIndex == 0 && (dialogueIndex == 2 || dialogueIndex == 1)) {
    dPerson = "GRANDMA";
  }
  // Update typing animation

  if (typingActive && millis() - lastTypeTime > typingSpeed) {
    displayIndex = min(displayIndex + 2, currentMessage.length);
    lastTypeTime = millis();
    if (displayIndex === currentMessage.length) {
      typingActive = false;
    }
  }
  let dImage = dialogueErinImage;
  if (dPerson == "ERIN") {
    dImage = dialogueErinImage;
  } else if (dPerson == "GRANDMA") {
    dImage = dialogueGrandmaImage;
    dialogueX = 205 + 95;
  }

  // Dialogue box
  push();
  imageMode(CENTER);
  image(dImage, width / 2, 510);
  pop();

  // Draw the dialogue text
  push();
  fill(0);
  textSize(12);
  //text(currentMessage, 205, 498, 305, 90);
  text(currentMessage.substring(0, displayIndex), dialogueX, 498, 305, 90);

  // Continue prompt
  if (displayIndex === currentMessage.length && frameCount % 60 < 30) {
    fill("#834916");
    text("Click to continue...", dialogueX, 558);
  }
  pop();
  handleDialogueClick(dIndex);
}

function handleDialogueClick(dIndex2) {
  if (mouseIsPressed) {
    if (!hasClicked && showDialogue) {
      hasClicked = true;

      if (displayIndex < currentMessage.length) {
        // Complete current message
        displayIndex = currentMessage.length;
        typingActive = false;
      } else {
        // Advance dialogue
        if (dialogueIndex < dialogueArr[dIndex2].length - 1) {
          dialogueIndex++;
          currentMessage = dialogueArr[dIndex2][dialogueIndex];
          displayIndex = 0;
          typingActive = true;
          lastTypeTime = millis();
        } else {
          showDialogue = false;
          dialogueIndex = -1;
        }
      }
      setTimeout(() => (hasClicked = false), 100);
    }
  }
}

function mousePressed() {
  if (showDialogue) {
    // handleDialogueClick();
  }
  // Add other mouse interactions here
}

// Call this to start the dialogue sequence
function startDialogue() {
  if (!showDialogue) {
    showDialogue = true;
    dialogueIndex = 0;
    //currentMessage = dialogueArr[0][dialogueIndex];
    displayIndex = 0;
    typingActive = true;
    lastTypeTime = millis();
  }
  startDialogueBool = false;
}

// Example usage - add this where you want dialogue to trigger:
// function keyPressed() {
//   if (key === ' ') {  // Example trigger with spacebar
//     startDialogue();
//   }
// }
