import React, { useState } from 'react';
import './HighScore.css';
import { onError } from "../../libs/errorLib";
import { useAppContext } from "../../libs/contextLib";
import { API } from "aws-amplify";
//import { useHistory } from "react-router";


function HighScore() {

  const [isLoading, setIsLoading] = useState(false);
  const [ scores, setScores] = useState([]);
  const { isAuthenticated } = useAppContext();
  //const history = useHistory();
  let g1s = 80;
  let g2s = 100;
  let g3s = 100;
  let g4s = 100;
  let globalscores;
  

  React.useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {

    if (!isAuthenticated) {
      return;
    }

    setIsLoading(true);
  
    try {
      const scores = await loadScores();
      globalscores = scores[0];
      setScores(scores);
      console.log(scores);
      if (scores[0].highscore == null || (g1s+g2s+g3s+g4s) > scores[0].highscore) {
        await createScore({"highscore":(g1s+g2s+g3s+g4s), "game1score":g1s,"game2score":g2s,"game3score":g3s,"game4score":g4s});
      
      } else {
        await createScore({"highscore":parseInt(scores[0].highscore), "game1score":g1s,"game2score":g2s,"game3score":g3s,"game4score":g4s});
      
      }
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

  function updateScores(score) {
    return API.post("user", "/user", {
      body: score
    });
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

        <p class="score-text">
            Your high score
        </p>
        <h1 class="score"> </h1>
        <br />
        <p class="score-text">
            Your most recent score
        </p>
        <h1 class="score">  </h1>
        <br />
        <p class="score-text">
            High Scores
        </p>
        <p class="score-text"> Add table here with place, name, and score </p>
        <br />

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