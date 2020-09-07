import React from "react";
import { Switch, Route } from "react-router-dom";

import Logar from "./pages/entrar";
import DashBoard from "./pages/home";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Logar} />
      <Route path="/home" component={DashBoard} />
    </Switch>
  );
}
