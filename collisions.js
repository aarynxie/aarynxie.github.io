let player;
// create a function in setup that defines all the locations of env obj - stores into obstacles array
// create a function that draws all the env obj

//one array to store the hitboxes, and one array to store the draw locations.
let obstacles = [
  [
    // room 0
    { x: 207, y: 0, w: 593, h: 118 },
    { x: 662, y: 103, w: 138, h: 467 },
    { x: 207, y: 263, w: 215, h: 45 },
    { x: 207, y: 103, w: 117, h: 160 },
    { x: 566, y: 163, w: 1, h: 20 },
    { x: 354, y: 103, w: 213, h: 60 },
    { x: 0, y: 0, w: 207, h: 600 },
    { x: 207, y: 477, w: 169, h: 123 },
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
    { x: 0, y: 0, w: 376, h: 52 },
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
    { x: -7, y: 150, type: "BUSH_SMALL" },
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

// need 3 arrays of 3 different level objectives
// change sticks show into objectives show?
// make a function that runs only once each time it switches to a new level, to initialize the objectivesShow into the current level's objective objects
let belongings = [
  { x: 442, y: 452, w: 50, h: 50, type: 3 }, // waterbottle
  { x: 706, y: 420, w: 50, h: 50, type: 0 }, // flashlight
  { x: 50, y: 199, w: 50, h: 50, type: 4 }, // bunny slippers
  { x: 147, y: 93, w: 50, h: 50, type: 1 }, //binoculars
  { x: 128, y: 49, w: 50, h: 50, type: 2 }, // sketchbook
];

let sticks = [
  { x: 470, y: 400, w: 45, h: 24, type: 6 },
  { x: 730, y: 130, w: 45, h: 24, type: 6 },
  { x: 100, y: 360, w: 45, h: 24, type: 6 },
  { x: 600, y: 50, w: 45, h: 24, type: 6 },
];

let worms = [
  { x: 570, y: 400, w: 45, h: 24 },
  { x: 730, y: 130, w: 45, h: 24 },
  { x: 100, y: 360, w: 45, h: 24 },
  { x: 600, y: 50, w: 45, h: 24 },
];

let objectives = [...belongings];
let objectivesShow = new Array(belongings.length).fill(true);
let objectivesCurrent = [...belongings];
let objectivesShowCurrent = [...objectivesShow];

let objectivesCounter = 0;
let objectivesTotal = belongings.length;

let thorns = [
  { x: 148, y: 29, w: 90, h: 52 },
  { x: 200, y: 129, w: 90, h: 52 },
  { x: 400, y: 339, w: 90, h: 52 },
];
let thornsCurrent = [...thorns];

let maxHealth = 4;
let health = maxHealth;

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
        obstacles[i].push({ x: 14 + env.x, y: env.y, w: 38, h: 1 });
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

// draws the background objects
// also debugging function that draws shapes to show the hitbox of obstacles and character
function backgroundDrawCols() {
  push();
  imageMode(CORNER);
  for (let env of envObjCurrent) {
    // draw the environment objects
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
  // debugging for hitboxes
  if (debuggingHitboxes) {
    fill(255, 0, 0, 100);
    for (let obs of obstaclesCurrent) {
      rect(obs.x, obs.y, obs.w, obs.h);
    }
    fill(0, 255, 0, 100);
    rect(playerPos.colX, playerPos.colY, 30, 70);
  }

  pop();

  push();
  imageMode(CORNER);
  objectivesDraw();
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
  if (debuggingHitboxes) {
    for (let thr of thornsCurrent) {
      rect(thr.x, thr.y, thr.w, thr.h);
      //image(stickImage, stk.x, stk.y);
    }
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

let level = 0; // 0 is prologue, then levels 1, 2, 3

let objectiveHit = false;
let previousObjectiveHit = false;

function objectivesDraw() {
  push();
  fill(0, 100);
  objectivesCol();
  for (let i = 0; i < objectivesCurrent.length; i++) {
    let obj = objectivesCurrent[i]; // Get the current element
    if (objectivesShowCurrent[i]) {
      if (currentLevel == 1) {
        image(inventoryItemsImage[obj.type], obj.x, obj.y);
        rect(obj.x, obj.y, obj.w, obj.h);
      } else if (currentLevel == 2) {
        image(stickImage, obj.x, obj.y);
        rect(obj.x, obj.y, obj.w, obj.h);
      }
    }
  }
  pop();
}
//collision for objectives
function objectivesCol() {
  let playerRect = {
    x: playerPos.colX,
    y: playerPos.colY,
    w: player.w,
    h: player.h,
  };
  objectiveHit = false;
  for (let i = 0; i < objectives.length; i++) {
    let stk = objectives[i];
    if (rectCollision(playerRect, stk)) {
      if (
        roomObjectivesIndices[currentRoom]?.includes(i) &&
        objectivesShow[i]
      ) {
        objectiveHit = true;
      }
      newItem = stk.type;
      updateObjectivesShow(currentRoom, i);
    }
  }
  if (objectiveHit && !previousObjectiveHit) {
    ifNewItem = true;
  }
  previousObjectiveHit = objectiveHit;
  // counts how many objective items the player has collected
  objectivesCounter = 0;
  for (let i = 0; i < objectivesShow.length; i++) {
    if (!objectivesShow[i]) {
      objectivesCounter++;
      addToInventory(objectives[i].type);
    }
  }
}

// defines which sticks in the array is in which room
let roomObjectivesIndices = {
  0: [0], // Room 0 affects index 0
  1: [1], // Room 1 affects indices 1 and 2 separately
  2: [2, 3],
  3: [4],
};

function updateObjectivesShow(currentRoom, objIndex) {
  if (roomObjectivesIndices[currentRoom]?.includes(objIndex)) {
    objectivesShow[objIndex] = false;
  }
}

function addToInventory(itemType) {
  // Check if the item is already in the inventory
  let existingItem = inventoryArr.find((item) => item.type === itemType);
  let quant;
  let ifUsable;
  if (itemType !== 5) {
    if (currentLevel == 1) {
      quant = 1;
    } else if (currentLevel == 2) {
      quant = objectivesCounter;
    }
  } else {
    quant = 1;
  }
  // if item is health kit, set to usable
  if (itemType == 5) {
    ifUsable = true;
  } else {
    ifUsable = false;
  }

  if (existingItem) {
    if (itemType !== 5) {
      existingItem.quantity = quant; // Increase quantity if already collected
    } else {
      existingItem.quantity += 1;
    }
  } else {
    inventoryArr.push({ type: itemType, quantity: quant, usable: ifUsable }); // Add new item
  }
}

let newItem = 3;
let ifNewItem = false;
