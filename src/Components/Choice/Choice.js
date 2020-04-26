import React, {useState, useEffect} from "react";
import { useAppContext } from "../../libs/contextLib";
import { Auth } from "aws-amplify";
import './Choice.css';
import { useHistory } from "react-router-dom";
import { API } from "aws-amplify";




export default function Choice() {

  const { userHasAuthenticated } = useAppContext();
  const history = useHistory();
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [highscoreurl, sethighscoreurl] = useState([]);
  
  function loadScores() {
    return API.get("user", "/list");
  }

  function createScore(score) {
    return API.post("user", "/user", {
      body: score
    });
  }

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
    
    setIsLoading(true);
    try {
      const user = await loadUser();
      setUser(user.attributes);
      if (userHasAuthenticated) {
        let hsu ="";
        const loaded = await loadScores();
        if (loaded[0] === undefined ) {
          await createScore({"name":user.attributes.name, "highscore":0, "game1score":0,"game2score":0,"game3score":0,"game4score":0});
          hsu = "/highscore/0/0/0/0";
        } else {
          hsu = "/highscore/"+loaded[0].game1score+"/"+loaded[0].game2score+"/"+loaded[0].game3score+"/"+loaded[0].game4score;
        }
        sethighscoreurl(hsu);
      }
    } catch (e) {
      alert(e);
    }
    setIsLoading(false);
  }
  onLoad();

  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
  if (!isLoading) {
    return (
      <div>
         { (user.name != null) ?
            <p class="home-text">
              Hello, {user.name}. <br />You can either play for a high score <br />  or practice an individual game.
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
              <form action={highscoreurl} method="get">
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
