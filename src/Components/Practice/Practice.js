import React, { Component } from "react";

class Practice extends Component {
  render() {
    return (
      <div>
        <div class="header"> 
            QUAD <br/>
            RATH <br />
            ALON <br />
        </div>
        
        <div class="button-flex-container">

          <div class="row"> 
        
          <div class="button-flex-item">
              <form action="/game1" method="get">
                <button type="submit"> 
                    GAME 1
                </button>
              </form>
            </div>
            
            <div class="button-flex-item">
              <form action="/game2" method="get">
                <button type="submit"> 
                    GAME 2
                </button>
              </form>
            </div>
            
            <div class="button-flex-item">
              <form action="/game3" method="get">
                <button type="submit"> 
                    GAME 3
                </button>
              </form>
            </div>
            
            <div class="button-flex-item">
              <form action="/game4" method="get">
                <button type="submit"> 
                    GAME 4
                </button>
              </form>
            </div>

          </div>
        
        </div> 
      </div>
    );
  }
}
export default Practice;
