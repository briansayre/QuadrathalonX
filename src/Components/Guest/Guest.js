import React, { Component } from "react";
import './Guest.css';

class Guest extends Component {
  render() {
    return (
      <div>
        
        <div class="button-flex-container">

          <div class="row"> 

            <div class="button-flex-item">
              <input class="text-input" type="text" placeholder="NAME" />
            </div>
        
            <div class="button-flex-item">
              <form action="/choice" method="get">
                <button type="submit"> 
                  CONTINUE
                </button>
              </form>
            </div>

          </div>
        
        </div> 
      </div>
    );
  }
}
export default Guest;
