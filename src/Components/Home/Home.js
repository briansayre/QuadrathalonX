import React, { Component } from "react";
import './Home.css';

class Home extends Component {
  render() {
    return (
      <div>
        <div class="header"> 
            QUAD <br/>
            RATH <br />
            ALON <br />
        </div>
        
        <p class="home-text">
            Test your gaming skills in <br/> a series of four games...
        </p>
        
        <div class="button-flex-container">
            <div class="row"> 

            <div class="button-flex-item">
              <form action="/login" method="get">
                <button type="submit"> 
                  LOG IN
                </button>
              </form>
            </div>
        
            <div class="button-flex-item">
              <form action="/signup" method="get">
                <button type="submit"> 
                  SIGN UP
                </button>
              </form>
            </div>
        
            <div class="button-flex-item">
              <form action="/guest" method="get">
                <button type="submit"> 
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
