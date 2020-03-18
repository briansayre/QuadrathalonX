import React, { Component } from "react";
import './HighScore.css';

class HighScore extends Component {
  render() {
    return (
      <div>
        <div class="header"> 
            QUAD <br/>
            RATH <br />
            ALON <br />
        </div>


        <p class="score-text">
            Your high score
        </p>
        <h1 class="score"> 99 </h1>

        <p class="score-text">
            Your most recent score
        </p>
        <h1 class="score"> 87 </h1>

        <p class="score-text">
            High Scores
        </p>
        <h3 class="score"> Add table here with place, name, and score </h3>
        <br />

      </div>
    );
  }
}
export default HighScore;