import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Components/Home/Home";
import LogIn from "./Components/LogIn/LogIn";

export default function Routes() {
  return (

    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={LogIn} />
    </Switch>
  );

}