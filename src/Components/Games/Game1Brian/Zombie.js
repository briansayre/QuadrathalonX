export default class Zombie { 

  col;
  x;
  y;
  p5;
  throughWall;
  speed;

  // Zombie constructor
  constructor(x, y, c, p) {
    this.x = x;
    this.y = y;
    this.col = c;
    this.p5 = p;
    this.throughWall = false;
    this.speed = (Math.floor(Math.random() * 4)) + 3;
  }

  // Moves the zombie
  move() {
    this.y += this.speed;
  }

  // Displays the zombie on the canvas
  show() {
    this.p5.fill(0, 80, 51);
    this.p5.ellipse(this.x, this.y, 30 ,30);
  }

} 