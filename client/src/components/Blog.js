import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { CustomContext } from "../CustomContext";
import NoContent from "./Pin/NoContent";
import CreatePin from "./Pin/CreatePin";
import { Paper } from "@material-ui/core";

const Blog = ({ classes }) => {
  const {
    state: { draft }
  } = CustomContext();
  // console.log("state:", draft);
  let BlogContent;

  if (!draft) {
    //pas mettre de content
    BlogContent = NoContent;
  } else if (draft) {
    // createPin compon.
    BlogContent = CreatePin;
  }

  return (
    <Paper className={classes.root}>
      <BlogContent />
    </Paper>
  );
};

const styles = {
  root: {
    minWidth: 350,
    maxWidth: 400,
    minHeight: "calc(100vh - 64px)",
    overflowY: "scroll",
    // position: "absolute",
    // opacity: 0.3,
    // zIndez: 10,
    // right: 0,
    display: "flex",
    justifyContent: "center"
  },
  rootMobile: {
    maxWidth: "100%",
    maxHeight: 300,
    overflowX: "hidden",
    overflowY: "scroll"
  }
};

export default withStyles(styles)(Blog);
