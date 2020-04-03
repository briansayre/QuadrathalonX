import React, { Component } from "react";
import './Home.css';

class Home extends Component {
  render() {
    return (
      <div>
        
        <p class="home-text">
            Test your gaming skills in <br/> a series of four games...
        </p>
        
        <div class="button-flex-container">
            <div class="row"> 

            <div class="button-flex-item">
              <form action="/login" method="get">
                <button className="pink-button" type="submit"> 
                  LOG IN
                </button>
              </form>
            </div>
        
            <div class="button-flex-item">
              <form action="/signup" method="get">
                <button className="pink-button" type="submit"> 
                  SIGN UP
                </button>
              </form>
            </div>
        
            <div class="button-flex-item">
              <form action="/guest" method="get">
                <button className="pink-button" type="submit"> 
                  GUEST
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
