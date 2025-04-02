let dialogueArr = [
  [
    "Hey grandma! Thank you so much for letting me stay at your cottage this weekend. I'll be there in 10 minutes!",
    "Of course, no problem at all, my dear. Now, I know the cold doesn't bother you, but night time at Owl Creek can get dangerously cold.",
    "Don't forget to turn on the furnace in the basement when you get there, okay? Do you have the key?",
    "Don't worry, I have it in my trusty owl backpack that you gave me! I'm pretty exhausted so I'm going to go now, but I'll call you back once I get settled in!",
  ],
  [
    "*Yawn* I'm too tired to do anything other than sleep right now… I'll unpack after taking a nap.",
  ],
  ["Woah!! What happened here?! My stuff is everywhere!"],
  [
    "Hmm... These feathers and talon prints...I think I have an idea of who the culprit is.",
    "Let's take a look at what's missing... Oh no! My owl backpack is gone! That bag had all my important stuff...",
    "*Sigh* Argh, I'll start by picking up my stuff and then figure out where my “dear” feathered friends might have gone!",
    "It looks like my waterbottle's just down there. Let's start with that.",
  ],
  ["My flashlight! I'll definitely need that when it gets dark."],
  [
    "Looks like these binoculars will come in handy for some bird watching...",
    "I also see my bunny slippers just behind those bushes. Hmm...Let's see if there's a path around to it if I keep going to the left.",
  ],
  ["These talon prints on the cover are actually kind of cute."],
  [
    "Got my water bottle. I should follow this path into the forest to see if I can find more of my belongings.",
  ],
  [
    "I probably won't be wearing these around the house before washing them properly.",
  ],
  ["Woah, what was that? Let me do a self-check. (Press Q)"],
  [
    "There's a cut on my leg...I better be careful around those thorns.",
    "I'll use the bandages in the health pack to help me recover. (Press E)",
  ],
  [
    "That should take care of the wound! But it appears I'm out of health packs. I'll have to restock on those the next time I go back to the cottage.",
  ],
  [
    "Let's see...It seems like I'll have enough space for around 2 more items in my bag. I'll keep exploring more of the forest for now and drop everything off at the cottage once it's full.",
  ],
  ["Oh! My binoculars are over there to my left."],
  [
    "My hands are getting too full...I need to go back to the cottage to drop all this off.",
  ],
  [
    "Hmm... I should probably explore everything around the cottage before heading deeper into the forest.",
  ],
];
let dialogueState = {
  index: -1,
  show: false,
  done: false,
  hasClicked: false,
  typingActive: false,
  displayIndex: 0,
  lastTypeTime: 0,
  currentMessageArr: null,
  currentMessage: "",
};

const typingSpeed = 50;

function startDialogue(dIndex) {
  if (!dialogueState.show) {
    dialogueState.show = true;
    dialogueState.index = 0;
    dialogueState.mainMessageIndex = dIndex;
    dialogueState.currentMessageArr = dialogueArr[dIndex];
    dialogueState.currentMessage = dialogueArr[dIndex][dialogueState.index];
    dialogueState.displayIndex = 0;
    dialogueState.typingActive = true;
    dialogueState.lastTypeTime = millis();
  }
}

function drawDialogue() {
  if (!dialogueState.show) return;

  let dPerson = "ERIN";
  let dialogueX = 205;
  if (dialogueState.mainMessageIndex == 0) {
    if (dialogueState.index == 1 || dialogueState.index == 2) {
      dPerson = "GRANDMA";
    }
  }

  let dImage = dPerson === "ERIN" ? dialogueErinImage : dialogueGrandmaImage;
  if (dPerson === "GRANDMA") dialogueX += 95;

  // Typing animation
  if (
    dialogueState.typingActive &&
    millis() - dialogueState.lastTypeTime > typingSpeed
  ) {
    dialogueState.displayIndex = min(
      dialogueState.displayIndex + 2,
      dialogueState.currentMessage.length
    );
    dialogueState.lastTypeTime = millis();
    if (dialogueState.displayIndex === dialogueState.currentMessage.length) {
      dialogueState.typingActive = false;
    }
  }

  push();
  imageMode(CENTER);
  image(dImage, width / 2, 510);
  pop();

  push();
  fill(0);
  textSize(12);
  text(
    dialogueState.currentMessage.substring(0, dialogueState.displayIndex),
    dialogueX,
    498,
    305,
    90
  );

  if (
    dialogueState.displayIndex === dialogueState.currentMessage.length &&
    frameCount % 60 < 30
  ) {
    fill("#834916");
    text("Click to continue...", dialogueX, 558);
  }
  pop();
}

function handleDialogueClick() {
  if (mouseIsPressed && dialogueState.show && !dialogueState.hasClicked) {
    dialogueState.hasClicked = true;

    if (dialogueState.displayIndex < dialogueState.currentMessage.length) {
      dialogueState.displayIndex = dialogueState.currentMessage.length;
      dialogueState.typingActive = false;
    } else {
      if (dialogueState.index < dialogueState.currentMessageArr.length - 1) {
        dialogueState.index++;
        dialogueState.currentMessage =
          dialogueState.currentMessageArr[dialogueState.index];
        dialogueState.displayIndex = 0;
        dialogueState.typingActive = true;
        dialogueState.lastTypeTime = millis();
      } else {
        // dialogue fully completed
        dialogueState.show = false;
        dialogueState.index = -1;
        if (dialogueDoneIndex) {
          dialogueDone[dialogueDoneIndex] = true;
        } else {
          dialogueDone.push(dialogueState.currentMessageArr);
        }
      }
    }
    setTimeout(() => (dialogueState.hasClicked = false), 100);
  }
}

let dialogueDone = [];
let dialogueDoneIndex;

function mousePressed() {
  if (dialogueState.show) {
    handleDialogueClick();
  }
}

function runDialogue(n) {
  dialogueDoneIndex = n;
  if (!dialogueState.show && !dialogueDone[n]) {
    startDialogueBool = true;
  }
  if (startDialogueBool) {
    startDialogue(n);
    startDialogueBool = false;
  }
}

// checks for certain conditions for dialogue and runs them
function dialogueChecks() {
  if (!somaCheck && donefirstSomaCheck) {
    runDialogue(10);
  }
  let temp = inventoryArr.find((item) => item.type === 5);
  if (!temp) {
    runDialogue(11);
  }
  if (
    currentLevel == 1 &&
    objectivesCounter == 3 &&
    !dialogueDone[12] &&
    !dialogueState.show
  ) {
    runDialogue(12);
    //debug this
  }
  if (currentLevel == 1 && levelComplete && !dialogueState.show) {
    runDialogue(14);
  }
  if (
    currentLevel == 1 &&
    currentRoom == 2 &&
    playerPos.colY > 60 &&
    !dialogueDone[13]
  ) {
    runDialogue(13);
  }
}
