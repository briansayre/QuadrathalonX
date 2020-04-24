import React, { useState } from 'react';
import './HighScore.css';
import { onError } from "../../libs/errorLib";
import { useAppContext } from "../../libs/contextLib";
import { API } from "aws-amplify";


function HighScore() {

  const [isLoading, setIsLoading] = useState(false);
  const [scores, setScores] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const { isAuthenticated } = useAppContext();
  let allscores = [];

  React.useEffect(() => {
    onLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onLoad() {
    
    setIsLoading(true);

    if (!isAuthenticated) {
      return;
    }

    try {
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
        await createScore({"highscore":(g1s+g2s+g3s+g4s), "game1score":g1s,"game2score":g2s,"game3score":g3s,"game4score":g4s});
      } else {
        await createScore({"highscore":loaded[0].highscore, "game1score":g1s,"game2score":g2s,"game3score":g3s,"game4score":g4s});
      }
      const finalloaded = await loadScores();
      setScores(finalloaded[0]);

      const loadedLeaderboard = await loadLeaderboard();
      setLeaderboard(loadedLeaderboard);
      console.log(loadedLeaderboard);

      for (let i = 0; i < loadedLeaderboard.length; i++) {
        allscores.push(loadedLeaderboard[i].highscore);
      }
      allscores.sort();
      allscores.splice(10);
      setLeaderboard(allscores);

      setIsLoading(false);
    } catch (e) {
      onError(e);
      console.log(e);
      setIsLoading(false);
    }
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
      <div>
        <p className="score-text">
            Your high score
        </p>
        <h1 className="score">{ scores.highscore } </h1>
        <br />
        <p className="score-text">
            Your most recent score
        </p>
        <h1 className="score"> { scores.totalscore } </h1>
        <br />
        <p className="score-text">
            High Scores
        </p>
        <div>
          <ol>
          {leaderboard.map(function(item, index){
            return (<h1 className="score"><li className="score-text" key={Math.random}>{item}</li></h1>)
          })}
          </ol>
        </div>

        <div class="button-flex-item">
          <form action="/choice" method="get">
            <button className="pink-button" type="submit"> 
              BACK
            </button>
          </form>
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