import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ReactDOM from "react-dom";

import "./shapes/shapes.index.css";
import "./dino/dino.index.css";

import Main from "./Main";
import Shapes from "./shapes/Shapes";
import Dino from "./dino/Dino";

ReactDOM.render(
  <Router>
    <Route exact path="/">
      <Main />
    </Route>
    <Switch>
      <Route exact path="/shapes">
        <Shapes />
      </Route>
      <Route exact path="/dino">
        <Dino />
      </Route>
    </Switch>
  </Router>,
  document.getElementById("root")
);
