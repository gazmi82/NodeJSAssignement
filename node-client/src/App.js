import React from "react";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/profile" component={Profile} />
      </Switch>
    </Router>
  );
}

export default App;
