import React, { Component } from "react";
import './LogIn.css';

class LogIn extends Component {
  render() {
    return (
      <div>
        
        <div class="button-flex-container">

          <div class="row"> 

            <div class="button-flex-item">
              <input class="text-input" type="text" placeholder="EMAIL" />
            </div>
        
            <div class="button-flex-item"> 
              <input class="text-input" type="password" placeholder="PASSWORD" />
            </div>
        
            <div class="button-flex-item">
              <form action="/choice" method="get">
                <button type="submit"> 
                  LOG IN
                </button>
              </form>
            </div>

          </div>
        
        </div> 
      </div>
    );
  }
}
export default LogIn;
