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
    "Got my slippers! I probably won't be wearing these around the house before washing them properly.",
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
  [
    "Urgh, why is it getting so hard to move? My legs feel like stone! Maybe I need to do a soma check. (Press Q)",
  ],
  ["Oh no - my fingertips are so blue! My body must be getting too cold."],
  [
    "Where's my jacket when I need it? Oh! There were a few in my lost backpack...Maybe I'll find them around the forest.",
  ],
  [
    "Where's my jacket when I need it? Oh! I think I picked one up earlier that I can put on. (Press E)",
  ],
  [
    "What's that? ...Oh yes! I finally found my jacket! It'll be nice to be warm and cozy again...",
    "And I should also be more protected from those annoying thorns! (Press E)",
  ], // 20
  [
    "Hey grandma! So uh...I left my luggage in the trunk of my van and took a nap...and I think some owls came and took my stuff...",
    "And I think they took the basement key. What should I do?",
    "Oh dear! That's not good...That means you won't be able to turn on the furnace for the night.",
    "Hmm...while you try to find your stuff, can you go collect some firewood? Just in case you need to keep warm the old fashioned way.",
    "Okay, thanks for the advice grandma! For now, I think I'll sort out some of my luggage to take an inventory of what's gone missing, but I'll keep you updated on the situation! Bye!",
  ], // 21
  [
    "Woah...the sun is setting already? I guess I better hurry up and collect some firewood while searching for the basement key. ",
    "I should explore deeper into the forest. If I remember correctly...There was a pathway in the southwest direction.",
  ], // 22
  [
    "Oh no! The thorns ripped my jacket...Do I have another one in my bag? I'll need to put one on before I get too cold again...",
  ], // 23
  ["This seems to be the right direction."], // 24
  [
    "Woah wait...What's that in the tree? An owl nest...?",
    "Hey! That's the basement key!!",
    "Hi friends, would it be okay if I-",
    "Ow! These owls are so feisty. It looks like they won't back down without a fight.",
    "Let me look around the forest to see if I can find some worms as a peace offering...",
    "But it's way too dark to see anything now. I need to go back to the cottage to get my flashlight.",
  ], // 25
  [
    "Okay... Got my flashlight. Time to look for some worms.",
    "I think 5 should be enough? Let's take a good look around the forest and head back to the nest.",
  ], // 26
  ["It's been a while... I should do a soma check. (Press Q)"], // 27
  ["Ok... It looks like I can go down to go deeper into the forest."], // 28
  [
    "Ow! The forest sure is loud at night...I'm getting a bit overwhelmed by these noises. *sigh* I wish I had my headphones...",
  ], // 29
  [
    "My old headphones! These should help block out the noises. I wish I had my thick, black headset though...Maybe they're also somewhere out here in the forest. (Press E)",
  ], // 30
  [
    "Looks like I found my noise cancelling headphones! These should block out all the forest noises.",
  ], // 31
  [
    "That should be all 5 worms! I should head back to the big tree with the owl nest in the southeast.",
  ], // 32
  ["There's the tree! Let's walk underneath it."], //33
  ["Great! It looks like I can go around these bushes to get my slippers."], //34
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
  } else if (dialogueState.mainMessageIndex == 21) {
    if (dialogueState.index == 2 || dialogueState.index == 3) {
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
  let temp = inventoryArr.find((item) => item.type === 5);
  if (!temp) {
    runDialogue(11);
  }
  if (!dialogueState.show) {
    if (currentLevel == 1) {
      if (!somaCheck && donefirstSomaCheck) {
        runDialogue(10);
      }
      if (objectivesCounter == 3 && !dialogueDone[12]) {
        runDialogue(12);
        // 2 more items
      }
      if (levelComplete) {
        runDialogue(14);
        // head back to cottage
      }
      if (currentRoom == 2 && playerPos.colY > 60 && !dialogueDone[13]) {
        runDialogue(13);
        // go to binoculars
      }
      if (currentRoom == 1 && !dialogueDone[34]) {
        runDialogue(34);
        // go around bushes
      }
    } else if (currentLevel == 2) {
      if (!dialogueDone[22]) {
        runDialogue(22);
      }
      if (temperature < 1200 && !dialogueDone[16]) {
        runDialogue(16);
        // getting cold
      }
      if (!somaCheck && donesecondSomaCheck && !dialogueDone[17]) {
        runDialogue(17);
      }
      let temp2 = inventoryArr.find((item) => item.type === 8);
      if (dialogueDone[17]) {
        if (!temp2 && !dialogueDone[18]) {
          runDialogue(18);
        } else if (!dialogueDone[19] && !dialogueDone[18]) {
          runDialogue(19);
        }
      }
      if (currentRoom == 3 && !fadingIn && !fadingOut && !dialogueDone[26]) {
        runDialogue(24);
      }
      if (currentRoom == 4 && !dialogueDone[28] && playerPos.colY > 200) {
        // go deeper by going down
        runDialogue(28);
      }
    } else if (currentLevel == 3) {
      // debug this

      if (!dialogueDone[26]) {
        runDialogue(26);
      }
      if (firstSO && !dialogueDone[29]) {
        runDialogue(29);
      }
      if (objectivesCounter > objectivesTotal && !dialogueDone[32]) {
        runDialogue(32);
      }
      if (levelComplete && !dialogueDone[33]) {
        runDialogue(33);
        // there's the tree
      }
    }
    if (health < 3 && !dialogueDone[27]) {
      runDialogue(27);
    }
  }
}
