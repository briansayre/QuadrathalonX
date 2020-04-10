export default class Stone { 

    x;
    y;
    p5;

    // Stone constructor
    constructor(x, y, p) { 
        this.x = x;
        this.y = y;
        this.p5 = p;
        this.stone = this.p5.loadImage('./Images/stone.png');
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
        this.p5.image(this.stone, this.x-15, this.y-15);
    }

} 