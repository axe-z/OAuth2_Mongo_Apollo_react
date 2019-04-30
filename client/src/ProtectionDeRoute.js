import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";

import MonContext from "./context";

const ProtectionDeRoute = ({ component: Component, ...rest }) => {
  const {
    state: { isAuth }
  } = useContext(MonContext);

  return (
    <Route
      render={props => (!isAuth ? <Redirect to="/login" /> : <Component {...props} />)}
      {...rest}
    />
  );
};

export default ProtectionDeRoute;
