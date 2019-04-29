import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import Login from "../components/Auth/Login";
import MonContext from "../context";

const Splash = () => {
  const { state } = useContext(MonContext);
  return state.isAuth ? <Redirect to="/" /> : <Login />;
};

export default Splash;
