let player;
let obstacles = [
  [
    { x: 100, y: 0, w: 225, h: 225 },
    { x: 325, y: 0, w: 400, h: 150 },
    { x: 700, y: 150, w: 100, h: 150 },
    { x: 0, y: 500, w: 500, h: 100 },
    { x: 675, y: 550, w: 500, h: 100 },
  ],
  [
    { x: 0, y: 0, w: 50, h: 95 },
    { x: 50, y: 0, w: 30, h: 30 },
    { x: 285, y: 0, w: 215, h: 75 },
    { x: 375, y: 75, w: 75, h: 50 },
    { x: 100, y: 0, w: 275, h: 5 },
    { x: 675, y: 0, w: 110, h: 63 },
    { x: 115, y: 118, w: 95, h: 100 },
    { x: 0, y: 215, w: 283, h: 63 },
    { x: 200, y: 233, w: 333, h: 70 },
    { x: 225, y: 300, w: 120, h: 50 },
    { x: 320, y: 350, w: 25, h: 33 },
    { x: 75, y: 390, w: 67, h: 63 },
    { x: 50, y: 450, w: 105, h: 25 },
    { x: 0, y: 475, w: 125, h: 75 },
    { x: 375, y: 495, w: 165, h: 70 },
    { x: 325, y: 550, w: 263, h: 50 },
    { x: 690, y: 175, w: 115, h: 60 },
    { x: 650, y: 230, w: 150, h: 63 },
    { x: 735, y: 275, w: 75, h: 100 },
    { x: 715, y: 375, w: 100, h: 75 },
    { x: 775, y: 450, w: 25, h: 45 },
  ],
  [
    { x: 0, y: 0, w: 25, h: 600 },
    { x: 25, y: 0, w: 25, h: 75 },
    { x: 50, y: 0, w: 25, h: 75 },
    { x: 75, y: 0, w: 25, h: 25 },
    { x: 25, y: 300, w: 25, h: 225 },
    { x: 50, y: 450, w: 25, h: 75 },
    { x: 100, y: 200, w: 100, h: 100 },
    { x: 300, y: 0, w: 500, h: 25 },
    { x: 325, y: 25, w: 125, h: 25 },
    { x: 275, y: 50, w: 175, h: 150 },
    { x: 225, y: 100, w: 50, h: 100 },
    { x: 325, y: 200, w: 50, h: 75 },
    { x: 250, y: 275, w: 150, h: 100 },
    { x: 175, y: 375, w: 100, h: 225 },
    { x: 150, y: 475, w: 25, h: 125 },
    { x: 350, y: 375, w: 60, h: 225 },
    { x: 410, y: 400, w: 25, h: 225 },
    { x: 325, y: 475, w: 25, h: 125 },
    { x: 435, y: 425, w: 15, h: 180 },
    { x: 550, y: 110, w: 105, h: 40 },
    { x: 650, y: 250, w: 50, h: 50 },
    { x: 540, y: 300, w: 180, h: 75 },
    { x: 500, y: 300, w: 50, h: 30 },
    { x: 500, y: 550, w: 100, h: 50 },
    { x: 600, y: 575, w: 25, h: 25 },
    { x: 625, y: 550, w: 175, h: 50 },
    { x: 775, y: 500, w: 25, h: 50 },
    { x: 700, y: 225, w: 100, h: 53 },
    { x: 775, y: 25, w: 25, h: 70 },
    { x: 655, y: 100, w: 95, h: 5 },
  ],
];
let obstaclesCurrent = [...obstacles];

let sticks = [
  { x: 470, y: 400, w: 45, h: 24 },
  { x: 730, y: 130, w: 45, h: 24 },
  { x: 100, y: 360, w: 45, h: 24 },
  { x: 600, y: 50, w: 45, h: 24 },
];
let sticksShow = new Array(sticks.length).fill(true);
let sticksCurrent = [...sticks];
let sticksShowCurrent = [...sticksShow];

let sticksCounter = 0;
let sticksTotal = sticks.length;

let thorns = [
  { x: 155, y: 420, w: 95, h: 52 },
  { x: 615, y: 120, w: 95, h: 52 },
  { x: 95, y: 120, w: 95, h: 52 },
];
let thornsCurrent = [...thorns];

let health = 4;

function initializeCols() {
  // Initialize player
  player = {
    x: playerPos.colX,
    y: playerPos.colY,
    w: 30,
    h: 70,
    speed: 3.5,
  };
}

// checks if the player can move or not and return boolean value
function canMove(newX, newY) {
  // Create temporary player rectangle
  let playerRect = {
    x: newX,
    y: newY,
    w: player.w,
    h: player.h,
  };

  // Check against all obstacles
  for (let obs of obstaclesCurrent) {
    if (rectCollision(playerRect, obs)) {
      return false;
    }
  }
  return true;
}

// checks the collision between 2 rectangular objects
function rectCollision(rect1, rect2) {
  return (
    rect1.x < rect2.x + rect2.w &&
    rect1.x + rect1.w > rect2.x &&
    rect1.y < rect2.y + rect2.h &&
    rect1.y + rect1.h > rect2.y
  );
}

// debugging function that draws shapes to show obstacles and character hitbox
function backgroundDrawCols() {
  /*
  push();
  noStroke();
  fill(255, 0, 0, 100);
  for (let obs of obstaclesCurrent) {
    rect(obs.x, obs.y, obs.w, obs.h);
  }
  fill(0, 255, 0, 100);
  rect(playerPos.colX, playerPos.colY, 30, 70);
  pop();*/
  push();
  imageMode(CORNER);
  sticksDraw();
  thornsDraw();
  pop();
  /*
  push();
  fill(0, 0, 255);
  for (let stk of sticks) {
    rect(stk.x, stk.y, stk.w, stk.h);
    //image(stickImage, stk.x, stk.y);
  }
  pop();
  push();
  fill(0, 0, 255, 100);
  for (let stk of thorns) {
    rect(stk.x, stk.y, stk.w, stk.h);
    //image(stickImage, stk.x, stk.y);
  }
  pop();*/
}

function thornsDraw() {
  push();
  fill(0);
  thornsCol();
  for (let thr of thornsCurrent) {
    //rect(thr.x, thr.y, thr.w, thr.h);
    image(thornsImage, thr.x - 10, thr.y);
  }
  pop();
  updateThornsHit();
}

let thornsHit = false;
let previousThornsHit = false;

function thornsCol() {
  let playerRect = {
    x: playerPos.colX,
    y: playerPos.colY,
    w: player.w,
    h: player.h,
  };
  thornsHit = false;
  for (let thr of thornsCurrent) {
    if (rectCollision(playerRect, thr)) {
      thornsHit = true;
    }
  }
}

function updateThornsHit() {
  // Call this every frame to detect changes
  detectThornsReset();
}

function detectThornsReset() {
  if (previousThornsHit && !thornsHit) {
    health--;
  }
  // Update previous state
  previousThornsHit = thornsHit;
}

function sticksDraw() {
  push();
  fill(0);
  sticksCol();

  for (let i = 0; i < sticksCurrent.length; i++) {
    let stk = sticksCurrent[i]; // Get the current element
    if (sticksShowCurrent[i]) {
      //rect(stk.x, stk.y, stk.w, stk.h);
      image(stickImage, stk.x, stk.y);
    }
  }
  pop();
}
//collision for sticks
function sticksCol() {
  let playerRect = {
    x: playerPos.colX,
    y: playerPos.colY,
    w: player.w,
    h: player.h,
  };

  for (let i = 0; i < sticks.length; i++) {
    let stk = sticks[i];

    if (rectCollision(playerRect, stk)) {
      updateSticksShow(currentRoom, i, false);
    }
  }
  sticksCounter = 0;
  for (let i = 0; i < sticksShow.length; i++) {
    if (!sticksShow[i]) {
      sticksCounter++;
    }
  }
}

// defines which sticks in the array is in which room
const roomStickIndices = {
  0: [0], // Room 0 affects index 0
  1: [1, 2], // Room 1 affects indices 1 and 2 separately
  4: [3],
};

function updateSticksShow(currentRoom, stickIndex, value) {
  if (roomStickIndices[currentRoom]?.includes(stickIndex)) {
    sticksShow[stickIndex] = value;
  }
}
