// Game state variable to track the current screen
// Possible states: "menu", "playing", "gameOver"
let gameState = "menu";
let alphaValue = 0; // Opacity for fade effect
let fadingIn = true; // Start with fade-in
let fadingOut = false;

function setup() {
  createCanvas(600, 400); // Set canvas size
  textAlign(CENTER, CENTER); // Ensures all text is centered
}

function draw() {
  background(20); // Dark background for visibility

  fill(255, alphaValue); // White text with controlled opacity
  textSize(32);

  // Switch between game states
  if (gameState === "menu") {
    drawMenu(); // Display menu screen
  } else if (gameState === "playing") {
    drawGame(); // Display gameplay screen
  } else if (gameState === "gameOver") {
    drawGameOver(); // Display game over screen
  }

  drawUI(); // UI elements that are always visible

  // Handle Fade-In Effect
  if (fadingIn) {
    alphaValue += 2; // Slow fade-in
    if (alphaValue >= 255) {
      alphaValue = 255;
      fadingIn = false; // Stop fade-in
    }
  }

  // Handle Fade-Out Effect
  if (fadingOut) {
    alphaValue -= 2; // Slow fade-out
    if (alphaValue <= 0) {
      alphaValue = 0;
      fadingOut = false;

      // Change game state after fade-out completes
      if (gameState === "playing") {
        gameState = "gameOver";
        fadingIn = true; // Start fade-in for new state
      } else if (gameState === "gameOver") {
        gameState = "menu"; // Properly reset to menu
        alphaValue = 0; // Reset opacity for menu fade-in
        fadingIn = true; // Start fade-in effect for menu
      }
    }
  }
}

// ---------------- Handling Key Presses for State Changes ---------------- //
function keyPressed() {
  // Start the game from the menu
  if (keyCode === ENTER && !fadingOut) {
    if (gameState === "menu") {
      gameState = "playing";
      alphaValue = 0; // Reset opacity for fade-in effect
      fadingIn = true;
    }
  }
  // End the game and go to the "gameOver" screen
  else if (key === "X" || key === "x") {
    if (gameState === "playing") {
      fadingOut = true; // Start fade-out
    }
  }
  // Restart the game and go back to the menu
  else if (key === "R" || key === "r") {
    if (gameState === "gameOver") {
      fadingOut = true; // Start fade-out
    }
  }
}
