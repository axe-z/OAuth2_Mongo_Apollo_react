// eslint-disable-next-line
import React, { useState, useContext, useReducer } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//hooks
import MonContext from "./context";
import monReducer from "./reducer";

import App from "./pages/App";
import Splash from "./pages/Splash";
import ProtectionDeRoute from "./ProtectionDeRoute";
import "mapbox-gl/dist/mapbox-gl.css";
import * as serviceWorker from "./serviceWorker";

const Root = () => {
  const initialState = useContext(MonContext);
  const [state, dispatch] = useReducer(monReducer, initialState);

  console.log(state);
  return (
    <Router>
      <MonContext.Provider value={{ state, dispatch }}>
        <Switch>
          <ProtectionDeRoute exact path="/" component={App} />
          <Route path="/login" component={Splash} />
        </Switch>
      </MonContext.Provider>
    </Router>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
