import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Homepage from "./components/homepage/Homepage";
import CreateProfile from "./components/createProfile/CreateProfile";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import NavBar from "./components/navbar/NavBar";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./components/context/UserContext";

const LoggedInRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !Cookies.get("token") ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <div className="App">
          <NavBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/homepage" component={Homepage} />
            <LoggedInRoute exact path="/login" component={Login} />
            <LoggedInRoute
              exact
              path="/new-profile"
              component={CreateProfile}
            />
          </Switch>{" "}
          <ToastContainer
            position="top-right"
            autoClose={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            draggable
            draggablePercent={60}
          />
        </div>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
