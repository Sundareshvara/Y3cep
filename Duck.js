let ducks = [];
let breads = [];
let pondX, pondY, pondRadius;
let dropButton, resetButton;
let poppedCount = 0

function setup() {
  createCanvas(800, 600);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);

  pondX = width / 2;
  pondY = height / 2;
  pondRadius = 200;

  // Create 10 ducks at random positions inside pond
  for (let i = 0; i < 10; i++) {
    let pos = randomPointInPond();
    ducks.push(new Duck(pos.x, pos.y));
  }

  // Start with 2 bread pieces
  for (let i = 0; i < 2; i++) {
    let pos = randomPointInPond();
    breads.push(new Bread(pos.x, pos.y));
  }

  // On-screen buttons
  dropButton = createButton("Drop Bread");
  dropButton.position(20, height - 40);
  dropButton.mousePressed(dropBread);

  resetButton = createButton("Reset");
  resetButton.position(120, height - 40);
  resetButton.mousePressed(resetSimulation);
}

function draw() {
  background(0, 180, 0); // Green background

  // Draw pond
  fill(0, 150, 255);
  noStroke();
  ellipse(pondX, pondY, pondRadius * 2);

  // Update and display ducks
  for (let duck of ducks) {
    duck.move(breads);
    duck.show();
  }

  // If fewer than 2 bread objects, auto-replenish
  while (breads.length < 2) {
    let pos = randomPointInPond();
    breads.push(new Bread(pos.x, pos.y));
  }

  // Display bread
  for (let bread of breads) {
    bread.show();
  }

// Display popped duck count
fill(255);
textSize(20);
textAlign(LEFT, TOP);
text("Popped Ducks: " + poppedCount, 20, 20);



}

// Drop bread at a random spot in the pond
function dropBread() {
  let pos = randomPointInPond();
  breads.push(new Bread(pos.x, pos.y));
}

// Get a random point inside the circular pond
function randomPointInPond() {
  let angle = random(TWO_PI);
  let radius = sqrt(random(1)) * (pondRadius-48); // Uniform distribution
  let x = pondX + radius * cos(angle);
  let y = pondY + radius * sin(angle);
  return createVector(x, y);
}

// Reset simulation
function resetSimulation() {
  poppedCount=0;
  ducks = [];
  breads = [];
  for (let i = 0; i < 10; i++) {
    let pos = randomPointInPond();
    ducks.push(new Duck(pos.x, pos.y));
  }
  for (let i = 0; i < 2; i++) {
    let pos = randomPointInPond();
    breads.push(new Bread(pos.x, pos.y));
  }
}
