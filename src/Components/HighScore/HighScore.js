import React, { useState } from 'react';
import './HighScore.css';
import { onError } from "../../libs/errorLib";
import { useAppContext } from "../../libs/contextLib";
import { API } from "aws-amplify";
import { Auth } from "aws-amplify";


function HighScore() {

  const [isLoading, setIsLoading] = useState(false);
  const [scores, setScores] = useState([]);
  const [user, setUser] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const { isAuthenticated } = useAppContext();


  React.useEffect(() => {
    function loadUser() {
      return Auth.currentAuthenticatedUser({bypassCache: true});
      
    }
    async function onLoad() {
    
    setIsLoading(true);

    if (!isAuthenticated) {
      return;
    }

    try {
      const user = await loadUser();
      setUser(user.attributes);
      let url = window.location.href.split('highscore')[1];
      let prevScores = url.split('/');
      prevScores.splice(0,1);
      console.log(prevScores);
      let g1s = parseInt(prevScores[0]);
      let g2s = parseInt(prevScores[1]);
      let g3s = parseInt(prevScores[2]);
      let g4s = parseInt(prevScores[3]);

      const loaded = await loadScores();
      console.log(loaded[0].highscore)
      if (loaded[0].highscore == null || (g1s+g2s+g3s+g4s) > loaded[0].highscore) {
        await createScore({"name":user.attributes.name, "highscore":(g1s+g2s+g3s+g4s), "game1score":g1s,"game2score":g2s,"game3score":g3s,"game4score":g4s});
      } else {
        await createScore({"name":user.attributes.name, "highscore":loaded[0].highscore, "game1score":g1s,"game2score":g2s,"game3score":g3s,"game4score":g4s});
      }
      const finalloaded = await loadScores();
      setScores(finalloaded[0]);

      let loadedLeaderboard = await loadLeaderboard();
      loadedLeaderboard.sort(compare)
      console.log(loadedLeaderboard)
      loadedLeaderboard.splice(5);
      //loadedLeaderboard.reverse();
      setLeaderboard(loadedLeaderboard);

      setIsLoading(false);
    } catch (e) {
      onError(e);
      console.log(e);
      setIsLoading(false);
    }}

    onLoad();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  function compare( a, b ) {
    return b.highscore-a.highscore;
  }

  
  function createScore(score) {
    return API.post("user", "/user", {
      body: score
    });
  }

  function loadScores() {
    return API.get("user", "/list");
  }

  function loadLeaderboard() {
    return API.get("user", "/leaderboard");
  }

  function renderLander() {
    return (
      <div >
        <h1 className="loading"> LOADING</h1>
      </div>
    );
  }

  function renderScores() {

    return (
      <div class="button-flex-container">
  
          <div class="row"> 

            <div class="button-flex-item">
              <p className="score-text">
                  {user.name}'s Scores
              </p>
            </div>

            <div class="button-flex-item">
              <table>
                <tr>
                  <th>High Score</th>
                  <th>Most Recent</th>
                </tr>
                <tr>
                  <td>{scores.highscore}</td>
                  <td>{scores.totalscore}</td>
                </tr>
              </table>
            </div>

            <div class="button-flex-item">
              <p className="score-text">
                  High Scores
              </p>
            </div>

        <div class="button-flex-item">
          <table>
          <tr>
            <th>Rank</th>
            <th>Score</th>
            <th>Name</th>
          </tr>
          {leaderboard.map(function(item, index){
            return (
            <tr key={index}>
              <td>{index+1}</td>
              <td>{item.highscore}</td>
              <td>{item.name}</td>
            </tr>
            )
          })}
          </table>
        </div>
          <br/>
        <div class="button-flex-item">
          <form action="/choice" method="get">
            <button className="pink-button" id="back-button" type="submit"> 
              BACK
            </button>
          </form>
        </div>

        </div>
      </div>
    );

  }

  return (
    <div>
      { !isLoading ? renderScores() : renderLander()}
    </div>
  );
  
}
export default HighScore;