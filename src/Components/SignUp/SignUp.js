import React, { Component } from "react";
import './SignUp.css';

class SignUp extends Component {
  render() {
    return (
      <div>
        
        <div class="button-flex-container">

          <div class="row"> 

            <div class="button-flex-item"> 
              <input class="text-input" type="text" placeholder="NAME" />
            </div>

            <div class="button-flex-item">
              <input class="text-input" type="text" placeholder="EMAIL" />
            </div>
        
            <div class="button-flex-item"> 
              <input class="text-input" type="text" placeholder="RETYPE EMAIL" />
            </div>

            <div class="button-flex-item"> 
              <input class="text-input" type="password" placeholder="PASSWORD" />
            </div>

            <div class="button-flex-item"> 
              <input class="text-input" type="password" placeholder="RETYPE PASSWORD" />
            </div>
        
            <div class="button-flex-item">
              <form action="/choice" method="get">
                <button className="pink-button" type="submit"> 
                  SIGN UP
                </button>
              </form>
            </div>

          </div>
        
        </div> 
      </div>
    );
  }
}
export default SignUp;
