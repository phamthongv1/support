/** @format */

import React from "react";
import Home from "./components/homepage";
import Login from "./components/login";
import Forgot from "./components/forgot";
import SignIn from "./components/sign-in";
import SignUp from "./components/sign-up";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Route path="/" component={Home} exact/>
      <Route path="/login" component={Login} exact/>
      <Route path="/forgot" component={Forgot} exact/>
      <Route path="/signin" component={SignIn} exact/>
      <Route path="/signup" component={SignUp} exact/>
    </Router>
  );
}

export default App;
