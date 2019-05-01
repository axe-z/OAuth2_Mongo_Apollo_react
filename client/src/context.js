// eslint-disable-next-line
import { createContext } from "react";

const MonContext = createContext({
  currentUser: null,
  isAuth: false,
  draft: null
});

export default MonContext;
