let player;
// create a function in setup that defines all the locations of env obj - stores into obstacles array
// create a function that draws all the env obj

//one array to store the hitboxes, and one array to store the draw locations.
let obstacles = [
  [
    // room 0
    { x: 100, y: 0, w: 225, h: 225 },
  ],
  [
    // room 1
    { x: 0, y: 0, w: 50, h: 95 },
  ],
  [
    // room 2
    { x: 0, y: 0, w: 25, h: 100 },
  ],
];
let obstaclesCurrent = [...obstacles];

let envObj = [
  [
    // room 0
    { x: 0, y: 0, type: "TREE_BIG" },
  ],
  [
    // room 1
    { x: 0, y: 0, type: "TREE_BIG" },
    { x: 0, y: 100, type: "TREE_BIG" },
  ],
  [
    // room 2
    { x: 0, y: 0, type: "TREE_BIG" },
    { x: 0, y: 200, type: "TREE_SMALL" },
  ],
];
let envObjCurrent = [...envObj];

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

  // initialize collisions for envObj from the array
  for (let env of envObj) {
    if (env.type == "TREE_BIG") {
    }
  }

  for (let i = 0; i < envObj.length; i++) {
    let room = envObj[i];

    for (let j = 0; j < room.length; j++) {
      let env = room[j];

      if (env.type == "TREE_BIG") {
        obstacles[i].push({ x: 65 + env.x, y: 27 + env.y, w: 66, h: 119 });
        obstacles[i].push({ x: 42 + env.x, y: 52 + env.y, w: 29, h: 31 });
        obstacles[i].push({ x: 87 + env.x, y: 8 + env.y, w: 82, h: 31 });
        obstacles[i].push({ x: 15 + env.x, y: 72 + env.y, w: 66, h: 75 });
        obstacles[i].push({ x: 172 + env.x, y: 31 + env.y, w: 66, h: 75 });
        obstacles[i].push({ x: 254 + env.x, y: 73 + env.y, w: 31, h: 54 });
        obstacles[i].push({ x: 173 + env.x, y: 49 + env.y, w: 78, h: 98 });
        obstacles[i].push({ x: 119 + env.x, y: 25 + env.y, w: 60, h: 150 });
      } else if (env.type == "TREE_SMALL") {
        obstacles[i].push({ x: 149 + env.x, y: 91 + env.y, w: 9, h: 20 });
        obstacles[i].push({ x: 41 + env.x, y: 31 + env.y, w: 13, h: 10 });
        obstacles[i].push({ x: 19 + env.x, y: 67 + env.y, w: 12, h: 13 });
        obstacles[i].push({ x: 149 + env.x, y: 111 + env.y, w: 18, h: 30 });
        obstacles[i].push({ x: 138 + env.x, y: 36 + env.y, w: 11, h: 109 });
        obstacles[i].push({ x: 120 + env.x, y: 17 + env.y, w: 18, h: 128 });
        obstacles[i].push({ x: 106 + env.x, y: 9 + env.y, w: 14, h: 136 });
        obstacles[i].push({ x: 8 + env.x, y: 80 + env.y, w: 23, h: 65 });
        obstacles[i].push({ x: 31 + env.x, y: 41 + env.y, w: 23, h: 104 });
        obstacles[i].push({ x: 54 + env.x, y: 12 + env.y, w: 29, h: 133 });
        obstacles[i].push({ x: 83 + env.x, y: 1 + env.y, w: 23, h: 161 });
      } else if (env.type == "BUSH_BIG") {
      }
    }
  }
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
  push();
  imageMode(CORNER);
  for (let env of envObjCurrent) {
    if (env.type == "TREE_BIG") {
      image(envObjImage[0], env.x, env.y);
    } else if (env.type == "TREE_SMALL") {
      image(envObjImage[1], env.x, env.y);
    }
  }
  noStroke();
  fill(255, 0, 0, 100);
  for (let obs of obstaclesCurrent) {
    rect(obs.x, obs.y, obs.w, obs.h);
    console.log("a");
  }

  fill(0, 255, 0, 100);
  rect(playerPos.colX, playerPos.colY, 30, 70);

  pop();

  /*
  push();
  imageMode(CORNER);
  //sticksDraw();
  //thornsDraw();
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
