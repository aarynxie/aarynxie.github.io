let walkingSound;
let popSound;
let cricketsSound;
let riverSound;

let SOSound;
let tear1Sound;
let tear2Sound;
let healSound;

let typeSound;
let somaCheckSound;

function soundPreload() {
  walkingSound = loadSound("sound/Walking_Sound.mp3");
  popSound = loadSound("sound/new/pop.mp3");
  cricketsSound = loadSound("sound/Crickets_Sound.mp3");
  riverSound = loadSound("sound/River_Sound.mp3");

  SOSound = loadSound("sound/new/wolf.mp3");
  tear1Sound = loadSound("sound/new/tear_1.mp3");
  tear2Sound = loadSound("sound/new/tear_2.mp3");
  healSound = loadSound("sound/new/heal_twinkle.mp3");

  typeSound = loadSound("sound/new/typeWriter.mp3");
  somaCheckSound = loadSound("sound/new/taskSound.mp3");
}

let cricketSoundDelay;
let cricketTimer = 0;

function soundSetup() {
  walkingSound.setVolume(1.5);
  cricketSoundDelay = random(500, 700);
}
function soundPlay() {
  if (playGame) {
    if (moving && !walkingSound.isPlaying()) {
      walkingSound.play();
    } else if (!moving || cutscene) {
      walkingSound.stop();
    }

    let playPop = detectobjectivesCounterChange();
    if (playPop) {
      popSound.play();
    }

    cricketTimer++;
    if (currentLevel == 3) {
      if (cricketTimer > cricketSoundDelay) {
        cricketTimer = 0;
        cricketSoundDelay = random(500, 700);
        cricketsSound.play();
      }
    }
    if (!riverSound.isPlaying()) {
      riverSound.play();
      if (currentRoom == 1 || currentRoom == 2 || currentRoom == 3) {
        riverSound.setVolume(0.5);
      } else {
        riverSound.setVolume(0.01);
      }
    }
  } else if (cutscene) {
    if (moving && !walkingSound.isPlaying()) {
      walkingSound.play();
    } else if (!moving) {
      walkingSound.stop();
    }
  } else {
    walkingSound.stop();
    cricketsSound.stop();
    riverSound.stop();
    tear1Sound.stop();
    tear2Sound.stop();
    SOSound.stop();
    typeSound.stop();
    somaCheckSound.stop();
  }
  if (!dialogueState.show) {
    typeSound.stop();
  }
}

let prevobjectivesCounter = 0;

function detectobjectivesCounterChange() {
  if (objectivesCounter !== prevobjectivesCounter) {
    prevobjectivesCounter = objectivesCounter;
    if (currentLevel == 2 && !dialogueDone[22]) {
    } else {
      return true;
    }
  }
}
