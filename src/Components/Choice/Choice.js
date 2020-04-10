import React, { Component } from "react";
import './Choice.css';

class Choice extends Component {
  render() {
    return (
      <div>

        <p class="home-text">
            Hello, name. You can either play for a high <br /> score or practice an individual game.
        </p>

        <div class="button-flex-container">
        
          <div class="row"> 

            <div class="button-flex-item">
              <form action="/game1" method="get">
                <button className="pink-button" type="submit"> 
                  PLAY
                </button>
              </form>
            </div>

            <div class="button-flex-item">
              <form action="/practice" method="get">
                <button className="pink-button" type="submit"> 
                  PRACTICE
                </button>
              </form>
            </div>

            <div class="button-flex-item">
              <form action="/highscore" method="get">
                <button className="pink-button" type="submit"> 
                  VIEW HIGH SCORES
                </button>
              </form>
            </div>

          </div>
        
        </div> 
      </div>
    );
  }
}
export default Choice;
