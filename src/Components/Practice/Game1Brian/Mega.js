export default class Mega { 

    col;
    x;
    y;
    health;
    p5;
    throughWall;

    // Mega constructor
    constructor(x, y, c, p) {
      this.x = x;
      this.y = y;
      this.col = [c-1, c, c+1];
      this.health = 3;
      this.p5 = p;
      this.throughWall = false;
      this.img1 = this.p5.loadImage('../Images/mega1.png');
      this.img2 = this.p5.loadImage('../Images/mega2.png');
      this.timer = 0;
      this.interval = 45;
      this.newTime = this.interval;
      this.switch = false;
    } 
  
    // Moves the mega
    move() {
      this.y++;
    }
  
    // Displays the mega on the canvas
    show() {
      this.timer++;
      if (this.timer > this.newTime) {
        this.newTime = this.timer + this.interval;
        this.switch = !this.switch;
      }
      if (this.switch) {
        this.p5.image(this.img1, this.x-45, this.y-45);
      } else {
        this.p5.image(this.img2, this.x-45, this.y-45);
      }
      this.p5.stroke(0);
      this.p5.fill(255, 255, 255);
      this.p5.rect(this.x-30, this.y, 60, 10);
      switch(this.health) {
        case 3:
            this.p5.fill(0, 255, 0);
            this.p5.rect(this.x-30, this.y, 60, 10);
            break;
        case 2:
            this.p5.fill(255, 153, 51);
            this.p5.rect(this.x-30, this.y, 40, 10);
            break;
        case 1:
            this.p5.fill(204, 51, 0);
            this.p5.rect(this.x-30, this.y, 20, 10);
            break;
        default:
            break;
      }
    }
  
  } 