import React, { Component } from "react";
import { Link } from "react-router-dom";
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
                <button> 
                  <Link class="link" to="/login"> LOG IN </Link>
                </button>
            </div>
        
            <div class="button-flex-item">
                <button> 
                  <Link class="link" to="/signup"> SIGN UP </Link>
                </button>
            </div>
        
            <div class="button-flex-item">
                <button> 
                  <Link class="link" to="/guest"> GUEST </Link>
                </button>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default Home;
