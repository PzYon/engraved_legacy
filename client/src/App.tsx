import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthenticatedApp } from "./AuthenticatedApp";
import { AuthenticationCallback } from "./authentication/AuthenticationCallback";

export const App: React.SFC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/authenticated/:jwt" component={AuthenticationCallback} exact={true} />
        <Route path="/" component={AuthenticatedApp} />
      </Switch>
    </Router>
  );
};
