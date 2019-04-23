import React, { Component } from "react";
import Done from "./Done";
import { BrowserRouter, Route } from "react-router-dom";
import Associations from "./Associations";
import Scanner from "./Scanner";
import Dons from "./Dons";
import Header from "./Header";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div style={{ minHeight: "100vh", backgroundColor: "#383839" }}>
          <Header />
          <div>
            <Route exact path="/" component={Associations} />
            <Route path="/scanner/:associationId" component={Scanner} />
            <Route path="/done" component={Done} />
            <Route path="/dons" component={Dons} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
