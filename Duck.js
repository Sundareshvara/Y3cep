class Duck {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-1, 1);
    this.vy = random(-1, 1);
    this.ax = 0;
    this.ay = 0;
    this.size = 28; // Normal duck size
  }

 move(breads) {
  this.ax = 0;
  this.ay = 0;

  let closest = null;
  let closestDist = Infinity;

  // Loop through all bread
  for (let i = breads.length - 1; i >= 0; i--) {
    let b = breads[i];
    let d = dist(this.x, this.y, b.x, b.y);

    // Eat any bread we’re close enough to
    if (d < 16) {
      breads.splice(i, 1);
      this.size += 4;
      continue;
    }

    // Track the closest bread within attraction range
    if (d < 150 && d < closestDist) {
      closest = b;
      closestDist = d;
    }
  }

  // Apply attraction toward the closest bread
  if (closest) {
    let dx = closest.x - this.x;
    let dy = closest.y - this.y;
    let force = 1 / (closestDist * closestDist);
    this.ax += dx * force;
    this.ay += dy * force;
  }

  // Wander if not attracted to any bread
  if (this.ax === 0 && this.ay === 0) {
    this.vx += random(-0.1, 0.1);
    this.vy += random(-0.1, 0.1);
  }

  // Apply acceleration and limit speed
  this.vx += this.ax;
  this.vy += this.ay;

  let speed = sqrt(this.vx * this.vx + this.vy * this.vy);
  if (speed > 2) {
    this.vx *= 2 / speed;
    this.vy *= 2 / speed;
  }

  this.x += this.vx;
  this.y += this.vy;

  // Stay inside pond
  let dx = this.x - pondX;
  let dy = this.y - pondY;
  let distFromCenter = sqrt(dx * dx + dy * dy);
  let buffer = max(this.size / 2, 14); // Adjust for duck size

  if (distFromCenter > pondRadius - buffer) {
    let angle = atan2(dy, dx);
    let targetDist = pondRadius - buffer - 1;
    this.x = pondX + targetDist * cos(angle);
    this.y = pondY + targetDist * sin(angle);
    this.vx *= -0.4;
    this.vy *= -0.4;
  }
}



  show() {
    if (this.size >= 60) {
      // Duck has popped — don't display
      let index = ducks.indexOf(this);
      if (index > -1) {
        ducks.splice(index, 1);
        poppedCount++; //Add to poppedCount
      }
      return;
    }

    textSize(this.size);
    text("🦆", this.x, this.y);
  }
}
