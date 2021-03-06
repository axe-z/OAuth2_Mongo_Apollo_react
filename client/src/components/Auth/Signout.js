import React, { useContext } from "react";
import { GoogleLogout } from "react-google-login";
import { withStyles } from "@material-ui/core/styles";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Typography from "@material-ui/core/Typography";
import MonContext from "../../context";

const Signout = ({ classes }) => {
  const { dispatch } = useContext(MonContext);
  //de react-google-login
  const onSignout = () => {
    dispatch({ type: "SIGNOUT_USER" });
    console.log("il est out");
  };
  return (
    <GoogleLogout
      onLogoutSuccess={onSignout}
      render={({ onClick }) => (
        <span className={classes.root} onClick={onClick}>
          <Typography variant="body1" className={classes.buttonText}>
            Quitter
          </Typography>
          <ExitToAppIcon className={classes.buttonIcon} />
        </span>
      )}
    />
  );
};

const styles = {
  root: {
    cursor: "pointer",
    display: "flex"
  },
  buttonText: {
    // color: "green"
    color: "rgb(147, 12, 12)"
  },
  buttonIcon: {
    marginLeft: "5px",
    // color: "green"
    color: "rgb(167, 12, 12)"
  }
};

export default withStyles(styles)(Signout);
