import React, { Component } from "react";
import './Game1.css';

class Game1 extends Component {

  state = {
    bird: {
        x: 50,
        y: 100,
        radius: 20
    }
  }

  constructor() {
    super();
    this.x = 0;
    this.state = {
      
    };

  }
  
  update = () => {
    this.x++;
  }


  componentDidMount() {
    setInterval(() => {
      this.update();
      this.draw();
    }, 1000 / 60);
}

  draw = () => {
    const ctx = this.refs.canvas.getContext("2d");
    // change this colour to change the colour of your 
    // "pen" in the canvas 
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.arc(this.x, 100, 20, 0, 2 * Math.PI);
  }

    render() {
      return (
        <div id="game">
          <canvas ref="canvas" width={600} height={400} />
        </div>      
      );
    }
  }

export default Game1;
