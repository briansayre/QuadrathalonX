import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Components/Home/Home";
import LogIn from "./Components/LogIn/LogIn";
import SignUp from "./Components/SignUp/SignUp";
import Guest from "./Components/Guest/Guest";
import Choice from "./Components/Choice/Choice";
import Practice from "./Components/Practice/Practice";
import HighScore from "./Components/HighScore/HighScore";
import Game1 from "./Components/Games/Game1Brian/Game1";
import Game2 from "./Components/Games/Game2Simba/Game2";
import Game3 from "./Components/Games/Game3Conley/Game3";
import Game4 from "./Components/Games/Game4Jackson/Game4";

export default function Routes() {
  return (

    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={LogIn} />
      <Route path="/signup" exact component={SignUp} />
      <Route path="/guest" exact component={Guest} />
      <Route path="/choice" exact component={Choice} />
      <Route path="/practice" exact component={Practice} />
      <Route path="/highscore" exact component={HighScore} />
      <Route path="/game1" exact component={Game1} />
      <Route path="/game2" exact component={Game2} />
      <Route path="/game3" exact component={Game3} />
      <Route path="/game4" exact component={Game4} />
    </Switch>
  );

}