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
    } 
  
    // Moves the mega
    move() {
      this.y++;
    }
  
    // Displays the mega on the canvas
    show() {
      this.p5.noStroke();
      this.p5.fill(35, 34, 74);
      this.p5.ellipse(this.x, this.y, 90 ,90);
      this.p5.stroke(0);
      this.p5.fill(255, 255, 255);
      this.p5.rect(this.x-30, this.y+30, 60, 10);
      switch(this.health) {
        case 3:
            this.p5.fill(0, 255, 0);
            this.p5.rect(this.x-30, this.y+30, 60, 10);
            break;
        case 2:
            this.p5.fill(255, 153, 51);
            this.p5.rect(this.x-30, this.y+30, 40, 10);
            break;
        case 1:
            this.p5.fill(204, 51, 0);
            this.p5.rect(this.x-30, this.y+30, 20, 10);
            break;
        default:
            break;
      }
    }
  
  } 