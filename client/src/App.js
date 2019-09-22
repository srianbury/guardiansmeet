import React from "react";
import "./App.css";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import Homepage from "./components/homepage/Homepage";
import CreateProfile from "./components/createProfile/CreateProfile";
import Login from "./components/login/Login";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/new-profile" component={CreateProfile} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
