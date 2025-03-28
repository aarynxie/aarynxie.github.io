let player;
// create a function in setup that defines all the locations of env obj - stores into obstacles array
// create a function that draws all the env obj

//one array to store the hitboxes, and one array to store the draw locations.
let obstacles = [
  [
    // room 0
    { x: 207, y: 0, w: 593, h: 118 },
    { x: 662, y: 118, w: 138, h: 482 },
    { x: 418, y: 118, w: 208, h: 90 },
    { x: 0, y: 0, w: 207, h: 600 },
    { x: 207, y: 464, w: 193, h: 136 },
  ], //{ x: , y: , w: , h:  },
  [
    // room 1
    { x: 0, y: 0, w: 83, h: 600 },
    { x: 83, y: 0, w: 317, h: 29 },
    { x: 400, y: 0, w: 400, h: 52 },
    { x: 83, y: 544, w: 580, h: 56 },
    { x: 663, y: 487, w: 137, h: 113 },
  ],
  [
    // room 2
    { x: 0, y: 0, w: 400, h: 52 },
    { x: 662, y: 0, w: 138, h: 52 },
    { x: 0, y: 487, w: 800, h: 113 },
  ],
  [
    // room 3
    { x: 0, y: 0, w: 86, h: 51 },
    { x: 0, y: 487, w: 174, h: 113 },
    { x: 400, y: 500, w: 400, h: 100 },
  ],
  [
    // room 4
    { x: 0, y: 0, w: 800, h: 50 },
    { x: 0, y: 542, w: 322, h: 58 },
    { x: 522, y: 542, w: 278, h: 90 },
  ],
  [
    // room 5
    { x: 0, y: 0, w: 717, h: 50 },
    { x: 717, y: 0, w: 83, h: 100 },
    { x: 0, y: 542, w: 800, h: 90 },
  ],
  [
    { x: 0, y: 0, w: 174, h: 100 },
    { x: 400, y: 0, w: 400, h: 44 },
    { x: 694, y: 44, w: 106, h: 556 },
    { x: 0, y: 542, w: 694, h: 90 },
  ],
];
let obstaclesCurrent = [...obstacles];

let envObj = [
  [
    // room 0
  ],
  [
    // room 1
    /*
    { x: 0, y: 0, type: "TREE_BIG" },
    { x: 0, y: 100, type: "TREE_BIG" },*/
  ],
  [
    // room 2
    /*
    { x: 0, y: 0, type: "TREE_BIG" },
    { x: 0, y: 200, type: "TREE_SMALL" },
    { x: 500, y: 200, type: "BUSH_BIG" },
    { x: 500, y: 400, type: "BUSH_SMALL" },
    { x: 600, y: 450, type: "ROCK_BIG" },
    { x: 400, y: 450, type: "ROCK_MEDIUM" },
    { x: 200, y: 450, type: "ROCK_SMALL" },*/
    { x: 265, y: 319, type: "BUSH_BIG" },
    { x: 102, y: 174, type: "BUSH_BIG" },
    { x: 78, y: 162, type: "ROCK_SMALL" },
    { x: 580, y: 363, type: "TREE_SMALL" },
    { x: -7, y: 121, type: "BUSH_SMALL" },
    { x: 272, y: 45, type: "ROCK_MEDIUM" },
  ],
  [
    // room 3
  ],
  [
    // room 4
  ],
  [
    // room 5
  ],
  [
    // room 6
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
  { x: 148, y: 29, w: 90, h: 52 },
  { x: 200, y: 129, w: 90, h: 52 },
  { x: 400, y: 339, w: 90, h: 52 },
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
        obstacles[i].push({ x: 37 + env.x, y: 15 + env.y, w: 23, h: 16 });
        obstacles[i].push({ x: 58 + env.x, y: 6 + env.y, w: 57, h: 25 });
        obstacles[i].push({ x: 116 + env.x, y: 15 + env.y, w: 12, h: 16 });
      } else if (env.type == "BUSH_SMALL") {
        obstacles[i].push({ x: 25 + env.x, y: env.y, w: 56, h: 1 });
      } else if (env.type == "ROCK_BIG") {
        obstacles[i].push({ x: 16 + env.x, y: 45 + env.y, w: 6, h: 12 });
        obstacles[i].push({ x: 22 + env.x, y: 32 + env.y, w: 8, h: 23 });
        obstacles[i].push({ x: 30 + env.x, y: 21 + env.y, w: 10, h: 36 });
        obstacles[i].push({ x: 112 + env.x, y: 45 + env.y, w: 6, h: 12 });
        obstacles[i].push({ x: 40 + env.x, y: 10 + env.y, w: 11, h: 47 });
        obstacles[i].push({ x: 104 + env.x, y: 26 + env.y, w: 9, h: 31 });
        obstacles[i].push({ x: 92 + env.x, y: 13 + env.y, w: 12, h: 44 });
        obstacles[i].push({ x: 84 + env.x, y: 7 + env.y, w: 8, h: 50 });
        obstacles[i].push({ x: 50 + env.x, y: 2 + env.y, w: 34, h: 55 });
      } else if (env.type == "ROCK_MEDIUM") {
        obstacles[i].push({ x: 17 + env.x, y: 13 + env.y, w: 11, h: 11 });
        obstacles[i].push({ x: 59 + env.x, y: 15 + env.y, w: 7, h: 17 });
        obstacles[i].push({ x: 6 + env.x, y: 24 + env.y, w: 22, h: 9 });
        obstacles[i].push({ x: 66 + env.x, y: 29 + env.y, w: 28, h: 4 });
        obstacles[i].push({ x: 28 + env.x, y: env.y, w: 33, h: 33 });
      } else if (env.type == "ROCK_SMALL") {
        //obstacles[i].push({ x: 14 + env.x, y: 7 + env.y, w: 13, h: 1 });
        obstacles[i].push({ x: 14 + env.x, y: env.y, w: 38, h: 1 });
        //obstacles[i].push({ x: 45 + env.x, y: 6 + env.y, w: 11, h: 1 });
      }
    } // obstacles[i].push({ x: + env.x, y:  + env.y, w: , h:  });
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
    } else if (env.type == "BUSH_BIG") {
      image(envObjImage[2], env.x, env.y);
    } else if (env.type == "BUSH_SMALL") {
      image(envObjImage[3], env.x, env.y);
    } else if (env.type == "ROCK_BIG") {
      image(envObjImage[4], env.x, env.y);
    } else if (env.type == "ROCK_MEDIUM") {
      image(envObjImage[5], env.x, env.y);
    } else if (env.type == "ROCK_SMALL") {
      image(envObjImage[6], env.x, env.y);
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

  push();
  imageMode(CORNER);
  //sticksDraw();
  thornsDraw();
  pop();
  /*
  push();
  fill(0, 0, 255);
  for (let stk of sticks) {
    rect(stk.x, stk.y, stk.w, stk.h);
    //image(stickImage, stk.x, stk.y);
  }
  pop();*/
  push();
  fill(0, 0, 255, 100);
  for (let stk of thornsCurrent) {
    rect(stk.x, stk.y, stk.w, stk.h);
    //image(stickImage, stk.x, stk.y);
  }
  pop();
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
