class Bread {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  show() {
    textSize(24);
    text("🍞", this.x, this.y);
  }
}
