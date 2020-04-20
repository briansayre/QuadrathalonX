import React from "react";
import { useAppContext } from "../../libs/contextLib";
import { Auth } from "aws-amplify";
import './Choice.css';
import { useHistory } from "react-router-dom";




export default function Choice() {

  const { userHasAuthenticated } = useAppContext();
  const history = useHistory();

  async function handleLogout() {
    await Auth.signOut();
    userHasAuthenticated(false);
    history.push("/");
  }
  
  
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


          <br />
          <br />


            <div class="button-flex-item">
                <button onClick={handleLogout}> 
                  LOGOUT
                </button>
            </div>

            

          </div>
        
        </div> 
      </div>
    );
}
