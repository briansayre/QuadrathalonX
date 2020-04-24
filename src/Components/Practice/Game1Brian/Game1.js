import React from "react";
import Sketch from "react-p5";
import './Game1.css';
import Zombie from './Zombie';
import Mega from './Mega';
import Wall from "./Wall";
import Stone from "./Stone";


function Game1() {

  // States of the game
  let states = {
    gameOver: false,
    gameStarted: false,
    zombies: [],
    megas: [],
    walls: [],
    stones: [],
    time: 10,
    timer: 0,
    score: 0,
    stone: 0,
    throughCount: 0,
  };

  

  // Draws the background of the game
  function drawBackground (p5) {

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
  function drawEnemies (p5) {

    // draw the zombies
    for (let i = states.zombies.length-1; i >=0; i--) {
      // check if zombie has run into wall
      if (states.zombies[i].y < 345 || states.zombies[i].throughWall) {
        states.zombies[i].move();
        // remove zombie that is off screen
        if (states.zombies[i].y > 450) {
          states.zombies.splice(i, 1);
          states.score -= 1;
          states.throughCount++;
        }
      // hit wall
      } else {
        states.zombies[i].y = 345;
        // wall is broken
        if (states.walls[states.zombies[i].col].status === 0) {
          states.zombies[i].move();
          states.zombies[i].throughWall = true;
        // wall isn't broken
        } else {
          states.walls[states.zombies[i].col].hit();
        }
      }
      states.zombies[i].show();
    }

    // draw the megas
    for (let i = states.megas.length-1; i >=0; i--) {

      // check if mega has run into wall
      if (states.megas[i].y < 315 || states.megas[i].throughWall) {
        states.megas[i].move();
        // remove mega that is off screen
        if (states.megas[i].y > 510) {
          states.megas.splice(i, 1);
          states.score -= 3;
          states.throughCount++;
        }
      // hit wall
      } else {
        // check if all walls are broken
        let allBroken = false;
        if (states.walls[states.megas[i].col[0]].status === 0 && 
          states.walls[states.megas[i].col[1]].status === 0 && 
          states.walls[states.megas[i].col[2]].status === 0) {
          allBroken = true;
        }
        // wall is broken
        if (allBroken) {
          states.megas[i].move();
          states.megas[i].throughWall = true;
        // wall isn't broken
        } else {
          if (states.walls[states.megas[i].col[0]].status !== 0) 
            states.walls[states.megas[i].col[0]].hit();
          if (states.walls[states.megas[i].col[1]].status !== 0) 
            states.walls[states.megas[i].col[1]].hit();
          if (states.walls[states.megas[i].col[2]].status !== 0) 
            states.walls[states.megas[i].col[2]].hit();
        }
      }
      states.megas[i].show();
    }

  }

  // Draw the walls on screen
  function drawWalls (p5)  {
    // draw the walls
    for (let i = 0; i < states.walls.length; i++) {
      states.walls[i].show();
    }
  }

  // Draw the stones on screen
  function drawStones  (p5)  {
    for (let i = 0; i < states.stones.length; i++) {
      states.stones[i].show();
    }
  }

  // Handles if a key is pressed
  function keyPressed (key)  {
    if (key.key === " ") {
      states.gameStarted = true;
    }
  };

  // Handles if a mouse has been pressed
  function mousePressed (mouse){

    // mouse position
    let mx = mouse.mouseX;
    let my = mouse.mouseY;
    
    // check if a mega was clicked
    for (let i = 0; i < states.megas.length; i++) {
      let mgx = states.megas[i].x;
      let mgy = states.megas[i].y;
      let d = Math.hypot(mgx-mx, mgy-my);
      if (d <= 45) {
        states.megas[i].health--;
        if (states.megas[i].health === 0) {
          states.megas.splice(i, 1);
        }
        states.score++;
        break;
      }
    }

    // check if a zombie was clicked
    for (let i = 0; i < states.zombies.length; i++) {
      let zx = states.zombies[i].x;
      let zy = states.zombies[i].y;
      let d = Math.hypot(zx-mx, zy-my);
      if (d <= 15) {
        states.zombies.splice(i, 1);
        states.score++;
        break;
      }
    }

    // check if a stone was clicked
    for (let j = 0; j < states.stones.length; j++) {
      let sx = states.stones[j].x;
      let sy = states.stones[j].y;
      let d = Math.hypot(sx-mx, sy-my);
      if (d <= 15) {
        states.stones.splice(j, 1);
        states.stone += 3;
        break;
      }
    }

    // check if a wall was clicked
    for (let k = 0; k < states.walls.length; k++) {
      let wx = states.walls[k].x+15; // add 15 because squares are generated 
      let wy = states.walls[k].y+15; // from the corner and not the center
      let d = Math.hypot(wx-mx, wy-my);
      if (d <= 20) {
        if (states.walls[k].canRepair()) {
          if (states.stone>0) {
            states.walls[k].status++;
            states.walls[k].totalHits -= 60;
            states.stone--;
          }
         } 
        break;
      }
    }

  };

  function beforeGame (p5) {

    // set background
    drawBackground(p5);
    drawWalls(p5);
    
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

  function afterGame (p5)  {

    // clear everything
    states.zombies = [];
    states.megas = [];
    states.walls = [];
    states.stones = [];
    p5.clear();
    drawBackground(p5);
    for (let i = 0; i < 20; i++) {
      states.walls.push(new Wall(i*30, 12*30, i, p5));
    }
    drawWalls(p5);

    // display text
    p5.fill(255);
    p5.stroke(0);
    p5.strokeWeight(3);
    p5.textAlign(p5.CENTER);
    p5.textSize(20);
    let text = "";
    text += "Your score was " + states.score;
    text += "\n\n You let " + states.throughCount + " enemies get in the castle";
    p5.text(text, p5.width/2, 160);
    p5.noLoop();
  }

  // Setup the sketch
  function setup(p5, canvasParentRef)  {

    // creates canvas
    p5.createCanvas(600, 420).parent(canvasParentRef);

    // create the wall objects in an array
    for (let k = 0; k < 20; k++) {
      states.walls.push(new Wall(k*30, 12*30, k, p5));
    }

    // Display menu before game
    beforeGame(p5);
  };

  // Draw each frame
  function draw (p5) {
    if (!states.gameOver && states.gameStarted) {

      // increment timer every frame
      states.timer++;

      // Adds a new zombie to zombies
      if ((states.timer%60) === 0) {
        let zc = Math.floor(Math.random() * 20);
        let zx = (zc * 30) + 15;
        states.zombies.push(new Zombie(zx, -40, zc, p5));
      }

      // Adds a new mega to megas
      if ((states.timer%300) === 0) {
        let mc = (Math.floor(Math.random() * 18))+1;
        let mx = (mc * 30) + 15;
        states.megas.push(new Mega(mx, -100, mc, p5));
      }

      // try to make a stone 
      let sc = Math.floor(Math.random() * 20);
      let sr = Math.floor(Math.random() * 12);
      let sx = (sc * 30) + 15;
      let sy = (sr * 30) + 15;
      let s = new Stone(sx, sy, p5);
      if (s.shouldSpawn()) {
        states.stones.push(s);
      }
      
      // decrements the time every second
      if (states.timer%60 === 0) {
        states.time--;
      }

      // check if time has run out
      if (states.time === 0) {
        states.gameOver = true;
      }

      // draw using the functions
      drawBackground(p5);
      drawWalls(p5);
      drawStones(p5);
      drawEnemies(p5);
      
      // display text
      p5.fill(255);
      p5.strokeWeight(2);
      p5.textAlign(p5.CENTER);
      p5.textSize(20);
      let text = "";
      text += 'Time: ' + states.time;
      text += '   Score: ' + states.score;
      text += '   Stone: ' + states.stone;
      p5.text(text, p5.width/2, 413 );

    }

    // display game over
    if (states.gameOver) {
      afterGame(p5);
    }
  };

  // ReactJS render method
  
    if (states.gameOver) {

    }
    return (
      <div className="game-container">
        <div>
          <Sketch setup={setup} draw={draw} keyPressed={keyPressed} mousePressed={mousePressed} />
        </div>
        
      </div>
    );
  

}

export default Game1;