import "./App.css";
import React from "react";
import Home from "../Home";
import Navbar from "../Navbar";

const App = () => {
  return (
    <div className="App">
      <header>
        <Navbar />
      </header>

      <section>
        <Home />
      </section>
    </div>
  );
};

export default App;
