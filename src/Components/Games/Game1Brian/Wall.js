export default class Wall { 

    /*
    3 = perfect
    2 = bit broken
    1 = almost gone
    0 = gone
    */
    status;
    x;
    y;
    col;
    totalHits;
    p5;
    img0;
    img1;
    img2;
    img3;

    // Wall constructor
    constructor(x, y, c, p) { 
        this.x = x;
        this.y = y;
        this.col = c;
        this.p5 = p;
        this.status = 3;
        this.totalHits = 0;
        this.img0 = this.p5.loadImage('./Images/0.png');
        this.img1 = this.p5.loadImage('./Images/1.png');
        this.img2 = this.p5.loadImage('./Images/2.png');
        this.img3 = this.p5.loadImage('./Images/3.png');
    }

    // Displays the wall on the canvas
    show() {
        this.p5.noStroke();
        switch(this.status) {
            case 3:
                this.p5.image(this.img3, this.x, this.y);
                break;
            case 2:
                this.p5.image(this.img2, this.x, this.y);
                break;
            case 1:
                this.p5.image(this.img1, this.x, this.y);
                break;
            case 0:
                this.p5.image(this.img0, this.x, this.y);
                break;
            default:
                break;
        }
    }

    // Damage the wall
    hit() {
        this.totalHits++
        this.status = 3 - Math.floor(this.totalHits/60);
        if (this.status < 0) this.status = 0;
    }

    // Can the wall be repaired
    canRepair () {
        return (this.status < 3);
    }

    // Repairs the wall one state
    repair() {
        this.status++;
        return true;
    }
    
} 