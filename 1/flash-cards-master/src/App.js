import React from "react";
import "./my-normalize.css";
import "./App.css";

import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./components/Homepage";
import FlashCards from "./components/FlashCards";
import ManageCards from "./components/ManageCards";
const App = () => {
  return (
    <div className="main-container">
      <Router>
        <Header />
        <div className="inner-content">
          <Route exact path="/" component={Homepage} />
          <Route exact path="/flash-cards" component={FlashCards} />
          <Route exact path="/manage-cards" component={ManageCards} />
        </div>
      </Router>
    </div>
  );
};

export default App;
