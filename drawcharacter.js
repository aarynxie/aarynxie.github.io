let walkImages = [];
let walkImagesJacket = [];

let frameIndex = 0;
let frameDelay = 12; // the number of draw cycles to wait before showing the next frame (60 fps / 5 = 12 fps, we are delaying each frame by 5 to make our animation 12 fps)
let frameCounter = 0;

let playerPos = {
  x: 500,
  y: 250,
  colX: 500, // used for detecting collision, since the sprite is drawn slightly off from its hitbox
  colY: 250,
};
let playerSpeed = 2.5;

let moving = false;
let facingDirection = "DOWN";

let currentFrame;

function playerPreload() {
  let walkFront = [];
  let walkSide = [];
  let walkBack = [];

  walkFront[0] = loadImage("sprites/character/walk/walk-front-1.png");
  walkFront[1] = loadImage("sprites/character/walk/walk-front-2.png");
  walkFront[2] = loadImage("sprites/character/walk/walk-front-3.png");
  walkFront[3] = loadImage("sprites/character/walk/walk-front-4.png");
  walkSide[0] = loadImage("sprites/character/walk/walk-side-1.png");
  walkSide[1] = loadImage("sprites/character/walk/walk-side-2.png");
  walkSide[2] = loadImage("sprites/character/walk/walk-side-3.png");
  walkSide[3] = loadImage("sprites/character/walk/walk-side-4.png");
  walkBack[0] = loadImage("sprites/character/walk/walk-back-1.png");
  walkBack[1] = loadImage("sprites/character/walk/walk-back-2.png");
  walkBack[2] = loadImage("sprites/character/walk/walk-back-3.png");
  walkBack[3] = loadImage("sprites/character/walk/walk-back-4.png");
  walkImages[0] = walkFront;
  walkImages[1] = walkSide;
  walkImages[2] = walkBack;

  let walkFrontJacket = [];
  let walkSideJacket = [];
  let walkBackJacket = [];
  walkFrontJacket[0] = loadImage(
    "sprites/character/walk/jacket/jacket-front-1.png"
  );
  walkFrontJacket[1] = loadImage(
    "sprites/character/walk/jacket/jacket-front-2.png"
  );
  walkFrontJacket[2] = loadImage(
    "sprites/character/walk/jacket/jacket-front-3.png"
  );
  walkFrontJacket[3] = loadImage(
    "sprites/character/walk/jacket/jacket-front-4.png"
  );
  walkSideJacket[0] = loadImage(
    "sprites/character/walk/jacket/jacket-side-1.png"
  );
  walkSideJacket[1] = loadImage(
    "sprites/character/walk/jacket/jacket-side-2.png"
  );
  walkSideJacket[2] = loadImage(
    "sprites/character/walk/jacket/jacket-side-3.png"
  );
  walkSideJacket[3] = loadImage(
    "sprites/character/walk/jacket/jacket-side-4.png"
  );
  walkBackJacket[0] = loadImage(
    "sprites/character/walk/jacket/jacket-back-1.png"
  );
  walkBackJacket[1] = loadImage(
    "sprites/character/walk/jacket/jacket-back-2.png"
  );
  walkBackJacket[2] = loadImage(
    "sprites/character/walk/jacket/jacket-back-3.png"
  );
  walkBackJacket[3] = loadImage(
    "sprites/character/walk/jacket/jacket-back-4.png"
  );
  walkImagesJacket[0] = walkFrontJacket;
  walkImagesJacket[1] = walkSideJacket;
  walkImagesJacket[2] = walkBackJacket;
}

function playerSetup() {
  imageMode(CENTER);
  moving = false;
  playerPos.x = playerPos.colX + 15;
  playerPos.y = playerPos.colY + 32;
  frameCounter++;
}

function playerDraw() {
  let spriteImage = walkImagesJacket;
  if (!wearingJacket) {
    spriteImage = walkImages;
  } else {
    spriteImage = walkImagesJacket;
  }
  let directionDraw;
  if (facingDirection == "UP") {
    directionDraw = 2;
  } else if (facingDirection == "LEFT" || facingDirection == "RIGHT") {
    directionDraw = 1;
  } else if (facingDirection == "DOWN") {
    directionDraw = 0;
  }
  if (moving) {
    if (frameCounter >= frameDelay) {
      frameCounter = 0;
      frameIndex = (frameIndex + 1) % spriteImage[directionDraw].length;
    }
    currentFrame = spriteImage[directionDraw][frameIndex];
  } else {
    currentFrame = spriteImage[directionDraw][0];
  }

  push();

  translate(playerPos.x, playerPos.y);
  if (facingDirection == "RIGHT") {
    scale(-1, 1);
  }
  image(currentFrame, 0, 0);
  pop();
}

// Handle player movement

function playerMove() {
  let maxSpeed = playerSpeed; // Maximum movement per frame
  let moveX = 0,
    moveY = 0; // Track movement

  let newX = playerPos.colX;
  let newY = playerPos.colY;

  // Check if movement keys are pressed and update movement accordingly
  if (keyIsDown(68) && playerPos.colX + 30 < width) {
    // D key (right)
    moveX = 1;
    facingDirection = "RIGHT";
  }
  if (keyIsDown(65) && playerPos.colX > 0) {
    // A key (left)
    moveX = -1;
    facingDirection = "LEFT";
  }
  if (keyIsDown(87) && playerPos.colY > 0) {
    // W key (up)
    moveY = -1;
    facingDirection = "UP";
    newY -= player.speed;
  }
  if (keyIsDown(83) && playerPos.colY + 70 < height) {
    // S key (down)
    moveY = 1;
    facingDirection = "DOWN";
  }

  // Calculate the total movement vector length
  let magnitude = Math.sqrt(moveX * moveX + moveY * moveY);
  let tempX = playerPos.colX;
  let tempY = playerPos.colY;
  if (magnitude > 0) {
    // Normalize movement and apply speed limit
    tempX += (moveX / magnitude) * maxSpeed;
    tempY += (moveY / magnitude) * maxSpeed;
    moving = true;
  } else {
    moving = false;
  }

  if (canMove(tempX, tempY)) {
    playerPos.colX = tempX;
    playerPos.colY = tempY;
  }
}
