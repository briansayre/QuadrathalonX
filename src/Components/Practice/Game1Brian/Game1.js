import React, { Component } from "react";
import Sketch from "react-p5";
import './Game1.css';
import Zombie from './Zombie';
import Mega from './Mega';
import Wall from "./Wall";
import Stone from "./Stone";


class Game1 extends Component {
  state = {
    sscore: 0
  }
  // States of the game
  states = {
    gameOver: false,
    gameStarted: false,
    zombies: [],
    megas: [],
    walls: [],
    stones: [],
    time: 60,
    timer: 0,
    score: 0,
    stone: 0,
    throughCount: 0,
  };

  // ReactJS constructor
  constructor(props) {
    super(props);
    console.log("game1");
  }

  // Draws the background of the game
  drawBackground = (p5) => {

    // draw the grass
    p5.noStroke();
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 13; j++) {
        if (i%2===0) {
          p5.fill(51, 204, 51);
        } else {
          p5.fill(0, 153, 51);
        }
        p5.rect(i*30, j*30, 30,30);
      }
    }

    // draw the red carpet
    p5.fill(120, 0, 0);
    for (let l = 0; l < 20; l++) {
      p5.rect(l*30, 13*30, 30,30);
    }

  }

  // Draws the enemies onto the screen
  drawEnemies = (p5) => {

    // draw the zombies
    for (let i = this.states.zombies.length-1; i >=0; i--) {
      // check if zombie has run into wall
      if (this.states.zombies[i].y < 345 || this.states.zombies[i].throughWall) {
        this.states.zombies[i].move();
        // remove zombie that is off screen
        if (this.states.zombies[i].y > 450) {
          this.states.zombies.splice(i, 1);
          this.states.score -= 20;
          this.states.throughCount++;
        }
      // hit wall
      } else {
        this.states.zombies[i].y = 345;
        // wall is broken
        if (this.states.walls[this.states.zombies[i].col].status === 0) {
          this.states.zombies[i].move();
          this.states.zombies[i].throughWall = true;
        // wall isn't broken
        } else {
          this.states.walls[this.states.zombies[i].col].hit();
        }
      }
      this.states.zombies[i].show();
    }

    // draw the megas
    for (let i = this.states.megas.length-1; i >=0; i--) {

      // check if mega has run into wall
      if (this.states.megas[i].y < 315 || this.states.megas[i].throughWall) {
        this.states.megas[i].move();
        // remove mega that is off screen
        if (this.states.megas[i].y > 510) {
          this.states.megas.splice(i, 1);
          this.states.score -= 3;
          this.states.throughCount++;
        }
      // hit wall
      } else {
        // check if all walls are broken
        let allBroken = false;
        if (this.states.walls[this.states.megas[i].col[0]].status === 0 && 
          this.states.walls[this.states.megas[i].col[1]].status === 0 && 
          this.states.walls[this.states.megas[i].col[2]].status === 0) {
          allBroken = true;
        }
        // wall is broken
        if (allBroken) {
          this.states.megas[i].move();
          this.states.megas[i].throughWall = true;
        // wall isn't broken
        } else {
          if (this.states.walls[this.states.megas[i].col[0]].status !== 0) 
            this.states.walls[this.states.megas[i].col[0]].hit();
          if (this.states.walls[this.states.megas[i].col[1]].status !== 0) 
            this.states.walls[this.states.megas[i].col[1]].hit();
          if (this.states.walls[this.states.megas[i].col[2]].status !== 0) 
            this.states.walls[this.states.megas[i].col[2]].hit();
        }
      }
      this.states.megas[i].show();
    }

  }

  // Draw the walls on screen
  drawWalls = (p5) => {
    // draw the walls
    for (let i = 0; i < this.states.walls.length; i++) {
      this.states.walls[i].show();
    }
  }

  // Draw the stones on screen
  drawStones = (p5) => {
    for (let i = 0; i < this.states.stones.length; i++) {
      this.states.stones[i].show();
    }
  }

  // Handles if a key is pressed
  keyPressed = (key) => {
    if (key.key === " ") {
      this.states.gameStarted = true;
    }
  };

  // Handles if a mouse has been pressed
  mousePressed = (mouse) => {

    // mouse position
    let mx = mouse.mouseX;
    let my = mouse.mouseY;
    
    // check if a mega was clicked
    for (let i = 0; i < this.states.megas.length; i++) {
      let mgx = this.states.megas[i].x;
      let mgy = this.states.megas[i].y;
      let d = Math.hypot(mgx-mx, mgy-my);
      if (d <= 45) {
        this.states.megas[i].health--;
        if (this.states.megas[i].health === 0) {
          this.states.megas.splice(i, 1);
        }
        this.states.score += 20;
        break;
      }
    }

    // check if a zombie was clicked
    for (let i = 0; i < this.states.zombies.length; i++) {
      let zx = this.states.zombies[i].x;
      let zy = this.states.zombies[i].y;
      let d = Math.hypot(zx-mx, zy-my);
      if (d <= 15) {
        this.states.zombies.splice(i, 1);
        this.states.score += 10;
        break;
      }
    }

    // check if a stone was clicked
    for (let j = 0; j < this.states.stones.length; j++) {
      let sx = this.states.stones[j].x;
      let sy = this.states.stones[j].y;
      let d = Math.hypot(sx-mx, sy-my);
      if (d <= 15) {
        this.states.stones.splice(j, 1);
        this.states.stone += 3;
        this.states.score += 5;
        break;
      }
    }

    // check if a wall was clicked
    for (let k = 0; k < this.states.walls.length; k++) {
      let wx = this.states.walls[k].x+15; // add 15 because squares are generated 
      let wy = this.states.walls[k].y+15; // from the corner and not the center
      let d = Math.hypot(wx-mx, wy-my);
      if (d <= 20) {
        if (this.states.walls[k].canRepair()) {
          if (this.states.stone>0) {
            this.states.walls[k].status++;
            this.states.walls[k].totalHits -= 60;
            this.states.stone--;
            this.states.score += 5;
          }
         } 
        break;
      }
    }

  };

  beforeGame = (p5) => {

    // set background
    this.drawBackground(p5);
    this.drawWalls(p5);
    
    // display text
    p5.fill(255);
    p5.stroke(0);
    p5.strokeWeight(3);
    p5.textAlign(p5.CENTER);
    p5.textSize(20);
    let text = "";
    text += "Welcome to game one!";
    text += "\n\n Click the zombies to smash them";
    text += "\n Don't let them into the castle";
    text += "\n\n Collect the stones that spawn";
    text += "\n Click on damaged walls to repair them using stone";
    text += "\n\n You have one minute";
    text += "\n Press SPACE to begin";
    p5.text(text, p5.width/2, 80 );

  }

  afterGame = (p5) => {

    // clear everything
    this.states.zombies = [];
    this.states.megas = [];
    this.states.walls = [];
    this.states.stones = [];
    p5.clear();
    this.drawBackground(p5);
    for (let i = 0; i < 20; i++) {
      this.states.walls.push(new Wall(i*30, 12*30, i, p5));
    }
    this.drawWalls(p5);

    // display text
    p5.fill(255);
    p5.stroke(0);
    p5.strokeWeight(3);
    p5.textAlign(p5.CENTER);
    p5.textSize(20);
    let text = "";
    text += "Your score was " + this.states.score;
    text += "\n\n You let " + this.states.throughCount + " enemies get in the castle";
    p5.text(text, p5.width/2, 160);
    p5.noLoop();

  }

  // Setup the sketch
  setup = (p5, canvasParentRef) => {

    // creates canvas
    p5.createCanvas(600, 420).parent(canvasParentRef);

    // create the wall objects in an array
    for (let k = 0; k < 20; k++) {
      this.states.walls.push(new Wall(k*30, 12*30, k, p5));
    }

    // Display menu before game
    this.beforeGame(p5);
  };

  // Draw each frame
  draw = p5 => {
    if (!this.states.gameOver && this.states.gameStarted) {

      // increment timer every frame
      this.states.timer++;

      // Adds a new zombie to zombies
      if ((this.states.timer%60) === 0) {
        let zc = Math.floor(Math.random() * 20);
        let zx = (zc * 30) + 15;
        this.states.zombies.push(new Zombie(zx, -40, zc, p5));
      }

      // Adds a new mega to megas
      if ((this.states.timer%300) === 0) {
        let mc = (Math.floor(Math.random() * 18))+1;
        let mx = (mc * 30) + 15;
        this.states.megas.push(new Mega(mx, -100, mc, p5));
      }

      // try to make a stone 
      let sc = Math.floor(Math.random() * 20);
      let sr = Math.floor(Math.random() * 12);
      let sx = (sc * 30) + 15;
      let sy = (sr * 30) + 15;
      let s = new Stone(sx, sy, p5);
      if (s.shouldSpawn()) {
        this.states.stones.push(s);
      }
      
      // decrements the time every second
      if (this.states.timer%60 === 0) {
        this.states.time--;
      }

      // check if time has run out
      if (this.states.time === 0) {
        this.states.gameOver = true;
      }

      // draw using the functions
      this.drawBackground(p5);
      this.drawWalls(p5);
      this.drawStones(p5);
      this.drawEnemies(p5);
      
      // display text
      p5.fill(255);
      p5.strokeWeight(2);
      p5.textAlign(p5.CENTER);
      p5.textSize(20);
      let text = "";
      text += 'Time: ' + this.states.time;
      text += '   Score: ' + this.states.score;
      text += '   Stone: ' + this.states.stone;
      p5.text(text, p5.width/2, 413 );
      
      this.setState({sscore: this.states.score})
    }

    // display game over
    if (this.states.gameOver) {
      this.afterGame(p5);
    }
  };

  // ReactJS render method
  render() {
    return (
      <div>
        <div className="game-container">
          <div>
            <Sketch setup={this.setup} draw={this.draw} keyPressed={this.keyPressed} mousePressed={this.mousePressed} />
          </div>
        </div>
      </div>
    );
  }

}

export default Game1;
