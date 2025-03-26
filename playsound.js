let walkingSound;
let popSound;
function soundPreload() {
  walkingSound = loadSound("sound/Walking_Sound.mp3");
  popSound = loadSound("sound/Pop_Sound.mp3");
  cricketsSound = loadSound("sound/Crickets_Sound.mp3");
  riverSound = loadSound("sound/River_Sound.mp3");
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
    } else if (!moving) {
      walkingSound.stop();
    }

    let playPop = detectSticksCounterChange();
    if (playPop) {
      popSound.play();
    }

    cricketTimer++;
    if (cricketTimer > cricketSoundDelay) {
      cricketTimer = 0;
      cricketSoundDelay = random(500, 700);
      cricketsSound.play();
    }
    if (!riverSound.isPlaying()) {
      riverSound.play();
      if (currentRoom == 1 || currentRoom == 2) {
        riverSound.setVolume(0.5);
      } else {
        riverSound.setVolume(0.05);
      }
    }
  } else {
    walkingSound.stop();
    cricketsSound.stop();
    riverSound.stop();
  }
}

let prevSticksCounter = 0;

function detectSticksCounterChange() {
  if (sticksCounter !== prevSticksCounter) {
    prevSticksCounter = sticksCounter;
    return true;
  }
}
