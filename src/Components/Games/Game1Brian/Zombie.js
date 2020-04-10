export default class Zombie { 

  col;
  x;
  y;
  p5;
  throughWall;
  speed;
  newTime;
  timer;
  img1;
  img2;
  switch;
  interval;

  // Zombie constructor
  constructor(x, y, c, p) {
    this.x = x;
    this.y = y;
    this.col = c;
    this.p5 = p;
    this.throughWall = false;
    this.speed = (Math.floor(Math.random() * 4)) + 3;
    this.timer = 0;
    this.interval = 10;
    this.newTime = this.interval;
    this.switch = false;
    this.img1 = this.p5.loadImage('./Images/Zombie1.png');
    this.img2 = this.p5.loadImage('./Images/Zombie2.png');
  }

  // Moves the zombie
  move() {
    this.y += this.speed;
  }

  // Displays the zombie on the canvas
  show() {
    this.timer++;
    if (this.timer > this.newTime) {
      this.newTime = this.timer + this.interval;
      this.switch = !this.switch;
    }
    if (this.switch) {
      this.p5.image(this.img1, this.x-15, this.y-12);
    } else {
      this.p5.image(this.img2, this.x-15, this.y-12);
    }
  }

} 