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

    // Wall constructor
    constructor(x, y, c, p) { 
        this.x = x;
        this.y = y;
        this.col = c;
        this.p5 = p;
        this.status = 3;
        this.totalHits = 0;
    }

    // Displays the wall on the canvas
    show() {
        this.p5.fill(150, 150, 150);
        this.p5.noStroke();
        switch(this.status) {
            case 3:
                this.p5.fill(150, 150, 150);
                break;
            case 2:
                this.p5.fill(150, 150, 150, 170);
                break;
            case 1:
                this.p5.fill(150, 150, 150, 85);
                break;
            case 0:
                this.p5.fill(150, 150, 150, 0);
                break;
            default:
                break;
        }
        this.p5.rect(this.x, this.y, 30,30);
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