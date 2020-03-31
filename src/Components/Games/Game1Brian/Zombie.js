class Zombie { 

    x;
    y;
    speed;
    p5;
    health = 1;
  
    constructor(x, y, s, p) { 
      this.x = x;
      this.y = y;
      this.speed = s;
      this.p5 = p;
    } 
  
    show() {
      this.p5.fill(0, 80, 51);
      this.p5.ellipse(this.x, this.y, 30 ,30);
    }
  
  } 

  export default Zombie;