import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/header";
import Result from "./result";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";

function App() {
  return (
    <React.Fragment>
      <Header />
      <Router>
        <Switch>
          <Route exact path="/" component={Step1} />
          <Route path="/step2" component={Step2} />
          <Route path="/step3" component={Step3} />
          <Route path="/result" component={Result} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
