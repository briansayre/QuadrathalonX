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
                <button> LOG IN </button>
            </div>
        
            <div class="button-flex-item">
                <button> SIGN UP </button>
            </div>
        
            <div class="button-flex-item">
                <button> GUEST </button>
            </div>
            </div>
        </div>
      </div>
    );
  }
}
export default Home;
