import React, { Component } from "react";
import './HighScore.css';

class HighScore extends Component {
  render() {
    return (
      <div>

        <p class="score-text">
            Your high score
        </p>
        <h1 class="score"> 99 </h1>
        <br />
        <p class="score-text">
            Your most recent score
        </p>
        <h1 class="score"> 87 </h1>
        <br />
        <p class="score-text">
            High Scores
        </p>
        <p class="score-text"> Add table here with place, name, and score </p>
        <br />

      </div>
    );
  }
}
export default HighScore;