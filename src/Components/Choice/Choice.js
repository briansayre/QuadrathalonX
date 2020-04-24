import React, {useState, useEffect} from "react";
import { useAppContext } from "../../libs/contextLib";
import { Auth } from "aws-amplify";
import './Choice.css';
import { useHistory } from "react-router-dom";




export default function Choice() {

  const { userHasAuthenticated } = useAppContext();
  const history = useHistory();
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  
  async function handleLogout() {
    await Auth.signOut();
    userHasAuthenticated(false);
    history.push("/");
  }

  useEffect(() => {
  function loadUser() {
    return Auth.currentAuthenticatedUser({bypassCache: true});
    
  }
  async function onLoad() {
    try {
      const user = await loadUser();
      setUser(user.attributes);
    } catch (e) {
      alert(e);
    }
    setIsLoading(false);
  }
  onLoad();
  }, []);

  
  if (!isLoading) {
    return (
      <div>
         { (user.name != null) ?
            <p class="home-text">
              Hello, {user.name}. You can either play for a high <br /> score or practice an individual game.
            </p>
            :
            <p class="home-text">
                Hello. You can either play for a high <br /> score or practice an individual game.
            </p>
          }

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
              <form action="/highscore/0/0/0/0" method="get">
                <button className="pink-button" type="submit"> 
                  VIEW HIGH SCORES
                </button>
              </form>
            </div>

            <div class="button-flex-item">
              <form>
                <button className="pink-button" onClick={handleLogout}> 
                  LOGOUT
                </button>
              </form>
            </div>

          </div>
        
        </div> 
      </div>
    );
  } else {
    return (
      <h1 className="loading"> LOADING </h1>
    );
  }
}
