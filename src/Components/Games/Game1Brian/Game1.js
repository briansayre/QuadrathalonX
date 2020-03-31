import React, { Component } from "react";
import Sketch from "react-p5";
import './Game1.css';
import Zombie from './Zombie.js';


var paused = false;
var zombies = [];
var timer = 0;
var score = 0;
//var board = [];


class Game1 extends Component {

  constructor(props){
    super(props);
    this.drawEnemies = this.drawEnemies.bind(this);
    this.drawBackground = this.drawBackground.bind(this);
  }
  
  // Draws the background of the game
  drawBackground = (p5) => {

    // draw the grass
    p5.noStroke();
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 12; j++) {
        if (i%2===0) {
          p5.fill(51, 204, 51);
        } else {
          p5.fill(0, 153, 51);
        }
        p5.rect(i*30, j*30, 30,30);
      }
    }

    // draw the red carpet
    p5.fill(150, 0, 0);
    for (let l = 0; l < 20; l++) {
      p5.rect(l*30, 13*30, 30,30);
    }

    // draw the castle wall
    for (let k = 0; k < 20; k++) {
        if (k%2===0) {
          p5.fill(102, 102, 102);
        } else {
          p5.fill(153, 153, 153);
        }
        p5.rect(k*30, 12*30, 30,30);
    }
    
  }

  // Draws the enemies onto the screen
  drawEnemies = (p5) => {

    // draw thw zombies
    for (let i = 0; i < zombies.length; i++) {
      if (zombies[i].y < 345) {
        zombies[i].y += 1;
      }
      zombies[i].show();
    }

  }

  // Setup the sketch
  setup = (p5, canvasParentRef) => {

    p5.createCanvas(600, 420).parent(canvasParentRef);

  };

  // Draw each frame
  draw = p5 => {
    if (!paused) {
      timer++;
      if (timer%100 === 0) {
        let x = (Math.floor(Math.random() * 20) * 30) + 15;
        zombies.push(new Zombie( x, -40, 100, p5));
      }
      this.drawBackground(p5)
      this.drawEnemies(p5)
      
      p5.fill(0);
      p5.textSize(20);
      p5.text('SCORE: ' + score, p5.width - 120, 20);
    }
  };

  // Handles if a key is pressed
  keyPressed = (key) => {
    if (key.key === " ") {
      paused = !paused;
    }
  };

  // Handles if a mouse has been pressed
  mousePressed = (mouse) => {
    let mx = mouse.mouseX;
    let my = mouse.mouseY;
    console.log(zombies);
    console.log(mx, my);
    for (let i = 0; i < zombies.length; i++) {
      let zx = zombies[i].x;
      let zy = zombies[i].y;
      let d = Math.sqrt((Math.pow((zx-mx), 2))+(Math.pow((zy-my), 2)));
      if (d <= 15) {
        zombies.splice(i, 1);
        score++;
        break;
      }
    }
  };

  render() {
    return (
      <div className="game-container">
        <div>
          <Sketch setup={this.setup} draw={this.draw} keyPressed={this.keyPressed} mousePressed={this.mousePressed} />
        </div>
      </div>
    );
  }

}

export default Game1;
