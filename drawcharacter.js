let walkImages = [];
let walkImagesJacket = [];
let walkImagesHeadphones1 = [];
let walkImagesJacketHeadphones1 = [];
let walkImagesHeadphones2 = [];
let walkImagesJacketHeadphones2 = [];
let SOImages = [];

let frameIndex = 0;
let frameDelay = 12; // the number of draw cycles to wait before showing the next frame (60 fps / 5 = 12 fps, we are delaying each frame by 5 to make our animation 12 fps)
let frameCounter = 0;

let playerPos = {
  x: 500,
  y: 250,
  colX: 430 + 15, // used for detecting collision, since the sprite is drawn slightly off from its hitbox
  colY: 284 + 25,
};

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
    "sprites/character/walk/jacket/jacket-walk-front-1.png"
  );
  walkFrontJacket[1] = loadImage(
    "sprites/character/walk/jacket/jacket-walk-front-2.png"
  );
  walkFrontJacket[2] = loadImage(
    "sprites/character/walk/jacket/jacket-walk-front-3.png"
  );
  walkFrontJacket[3] = loadImage(
    "sprites/character/walk/jacket/jacket-walk-front-4.png"
  );
  walkSideJacket[0] = loadImage(
    "sprites/character/walk/jacket/jacket-walk-side-1.png"
  );
  walkSideJacket[1] = loadImage(
    "sprites/character/walk/jacket/jacket-walk-side-2.png"
  );
  walkSideJacket[2] = loadImage(
    "sprites/character/walk/jacket/jacket-walk-side-3.png"
  );
  walkSideJacket[3] = loadImage(
    "sprites/character/walk/jacket/jacket-walk-side-4.png"
  );
  walkBackJacket[0] = loadImage(
    "sprites/character/walk/jacket/jacket-walk-back-1.png"
  );
  walkBackJacket[1] = loadImage(
    "sprites/character/walk/jacket/jacket-walk-back-2.png"
  );
  walkBackJacket[2] = loadImage(
    "sprites/character/walk/jacket/jacket-walk-back-3.png"
  );
  walkBackJacket[3] = loadImage(
    "sprites/character/walk/jacket/jacket-walk-back-4.png"
  );
  walkImagesJacket[0] = walkFrontJacket;
  walkImagesJacket[1] = walkSideJacket;
  walkImagesJacket[2] = walkBackJacket;

  let walkFrontHeadphones2 = [];
  let walkSideHeadphones2 = [];
  let walkBackHeadphones2 = [];

  walkFrontHeadphones2[0] = loadImage(
    "sprites/character/walk/no-jacket-headphones2/headphone-walk-front-1.png"
  );
  walkFrontHeadphones2[1] = loadImage(
    "sprites/character/walk/no-jacket-headphones2/headphone-walk-front-2.png"
  );
  walkFrontHeadphones2[2] = loadImage(
    "sprites/character/walk/no-jacket-headphones2/headphone-walk-front-3.png"
  );
  walkFrontHeadphones2[3] = loadImage(
    "sprites/character/walk/no-jacket-headphones2/headphone-walk-front-4.png"
  );
  walkSideHeadphones2[0] = loadImage(
    "sprites/character/walk/no-jacket-headphones2/headphone-walk-side-1.png"
  );
  walkSideHeadphones2[1] = loadImage(
    "sprites/character/walk/no-jacket-headphones2/headphone-walk-side-2.png"
  );
  walkSideHeadphones2[2] = loadImage(
    "sprites/character/walk/no-jacket-headphones2/headphone-walk-side-3.png"
  );
  walkSideHeadphones2[3] = loadImage(
    "sprites/character/walk/no-jacket-headphones2/headphone-walk-side-4.png"
  );
  walkBackHeadphones2[0] = loadImage(
    "sprites/character/walk/no-jacket-headphones2/headphone-walk-back-1.png"
  );
  walkBackHeadphones2[1] = loadImage(
    "sprites/character/walk/no-jacket-headphones2/headphone-walk-back-2.png"
  );
  walkBackHeadphones2[2] = loadImage(
    "sprites/character/walk/no-jacket-headphones2/headphone-walk-back-3.png"
  );
  walkBackHeadphones2[3] = loadImage(
    "sprites/character/walk/no-jacket-headphones2/headphone-walk-back-4.png"
  );
  walkImagesHeadphones2[0] = walkFrontHeadphones2;
  walkImagesHeadphones2[1] = walkSideHeadphones2;
  walkImagesHeadphones2[2] = walkBackHeadphones2;

  let walkFrontJacketHeadphones2 = [];
  let walkSideJacketHeadphones2 = [];
  let walkBackJacketHeadphones2 = [];

  walkFrontJacketHeadphones2[0] = loadImage(
    "sprites/character/walk/jacket-headphones2/jacket-headphone-walk-front-1.png"
  );
  walkFrontJacketHeadphones2[1] = loadImage(
    "sprites/character/walk/jacket-headphones2/jacket-headphone-walk-front-2.png"
  );
  walkFrontJacketHeadphones2[2] = loadImage(
    "sprites/character/walk/jacket-headphones2/jacket-headphone-walk-front-3.png"
  );
  walkFrontJacketHeadphones2[3] = loadImage(
    "sprites/character/walk/jacket-headphones2/jacket-headphone-walk-front-4.png"
  );
  walkSideJacketHeadphones2[0] = loadImage(
    "sprites/character/walk/jacket-headphones2/jacket-headphone-walk-side-1.png"
  );
  walkSideJacketHeadphones2[1] = loadImage(
    "sprites/character/walk/jacket-headphones2/jacket-headphone-walk-side-2.png"
  );
  walkSideJacketHeadphones2[2] = loadImage(
    "sprites/character/walk/jacket-headphones2/jacket-headphone-walk-side-3.png"
  );
  walkSideJacketHeadphones2[3] = loadImage(
    "sprites/character/walk/jacket-headphones2/jacket-headphone-walk-side-4.png"
  );
  walkBackJacketHeadphones2[0] = loadImage(
    "sprites/character/walk/jacket-headphones2/jacket-headphone-walk-back-1.png"
  );
  walkBackJacketHeadphones2[1] = loadImage(
    "sprites/character/walk/jacket-headphones2/jacket-headphone-walk-back-2.png"
  );
  walkBackJacketHeadphones2[2] = loadImage(
    "sprites/character/walk/jacket-headphones2/jacket-headphone-walk-back-3.png"
  );
  walkBackJacketHeadphones2[3] = loadImage(
    "sprites/character/walk/jacket-headphones2/jacket-headphone-walk-back-4.png"
  );
  walkImagesJacketHeadphones2[0] = walkFrontJacketHeadphones2;
  walkImagesJacketHeadphones2[1] = walkSideJacketHeadphones2;
  walkImagesJacketHeadphones2[2] = walkBackJacketHeadphones2;

  SOImages[0] = loadImage("sprites/character/SO-front.png");
  SOImages[1] = loadImage("sprites/character/SO-side.png");
  SOImages[2] = loadImage("sprites/character/SO-back.png");
}

function playerSetup() {
  imageMode(CENTER);
  moving = false;
  playerPos.x = playerPos.colX + 15;
  playerPos.y = playerPos.colY + 32;
  frameCounter++;
}

let wearingHeadphones;

function playerDraw() {
  let spriteImage = walkImagesJacket;
  if (!wearingJacket) {
    // if not wearing jacket
    spriteImage = walkImages;
    if (wearingHeadphones) {
      if (headphonesStage < 2) {
        spriteImage = walkImagesHeadphones2; // change to 1
      } else {
        spriteImage = walkImagesHeadphones2;
      }
    }
  } else {
    // if wearing jacket
    spriteImage = walkImagesJacket;
    if (wearingHeadphones) {
      if (headphonesStage < 2) {
        spriteImage = walkImagesJacketHeadphones2; // change to 1
      } else {
        spriteImage = walkImagesJacketHeadphones2;
      }
    }
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
  if (stopMoveSO) {
    currentFrame = SOImages[directionDraw];
  }

  push();

  translate(playerPos.x, playerPos.y);
  if (facingDirection == "RIGHT") {
    scale(-1, 1);
  }
  image(currentFrame, 0, 0);
  pop();
  healDraw();
}

// Handle player movement
let maxSpeed = playerSpeed;
function playerMove() {
  let moveX = 0,
    moveY = 0; // Track movement

  // Check if movement keys are pressed and update movement accordingly
  if (keyIsDown(68) && playerPos.colX + 30 < width) {
    // D key (right)
    moveX = playerSpeed;
    facingDirection = "RIGHT";
  }
  if (keyIsDown(65) && playerPos.colX > 0) {
    // A key (left)
    moveX = playerSpeed * -1;
    facingDirection = "LEFT";
  }
  if (keyIsDown(87) && playerPos.colY > 0) {
    // W key (up)
    moveY = playerSpeed * -1;
    facingDirection = "UP";
  }
  if (keyIsDown(83) && playerPos.colY + 70 < height) {
    // S key (down)
    moveY = playerSpeed;
    facingDirection = "DOWN";
  }

  // Calculate the total movement vector length
  let magnitude = Math.sqrt(moveX * moveX + moveY * moveY);
  let tempX = playerPos.colX;
  let tempY = playerPos.colY;
  if (magnitude > 0) {
    // Normalize movement and apply speed limit
    tempX += (moveX / magnitude) * playerSpeed;
    tempY += (moveY / magnitude) * playerSpeed;
    moving = true;
  } else {
    moving = false;
  }

  //if (canMove(tempX, tempY)) {
  if (hitboxesOn) {
    if (
      canMove(tempX, tempY) &&
      !fadingOut &&
      !fadingIn &&
      !inventoryMode &&
      !stopMoveSO
    ) {
      playerPos.colX = tempX;
      playerPos.colY = tempY;
    }
  } else {
    if (!fadingOut && !fadingIn && !inventoryMode) {
      playerPos.colX = tempX;
      playerPos.colY = tempY;
    }
  }
}
