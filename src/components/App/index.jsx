import "./App.css";
import React from "react";
import Home from "../Home";
import Navbar from "../Navbar";
import Commits from "../Commits";
import { Switch, Route } from "react-router-dom";
import "../../stylesheet-components/css/settings/color.css";

const App = () => {
  return (
    <div className="App">
      <header>
        <Navbar />
      </header>

      <section>
        <Switch>
          <Route exact path="/"  component={Home} />
          <Route path="/commits" component={Commits} />
        </Switch>
      </section>
    </div>
  );
};

export default App;
