import { useContext } from "react";
import MonContext from "./context";

//pour skipper l import du hooks partout.
export const CustomContext = () => {
  return useContext(MonContext);
};
