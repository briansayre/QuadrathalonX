export default class Stone { 

    x;
    y;
    p5;

    // Stone constructor
    constructor(x, y, p) { 
        this.x = x;
        this.y = y;
        this.p5 = p;
    }

    // Checks if the stone should randomly spawn
    shouldSpawn() {
        // 1 in 180 chance every frame so ~1 stone per 3 seconds
        let rand = Math.floor(Math.random() * (180)); 
        if (rand === 1) {
            return true;
        }
        return false;
    }

    // Displays the stone on the canvas
    show() {
        this.p5.noStroke();
        this.p5.fill(100, 100, 100);
        this.p5.ellipse(this.x, this.y, 15, 15);
    }

} 