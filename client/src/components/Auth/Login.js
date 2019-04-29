// eslint-disable-next-line
import React, { useState, useContext } from "react";
import { GraphQLClient } from "graphql-request";
import { withStyles } from "@material-ui/core/styles";
import { GoogleLogin } from "react-google-login";
import MonContext from "../../context";
import Typography from "@material-ui/core/Typography";
import { ME_QUERY } from "../../graphql/queries";
// const ME_QUERY = `
// {
//   me {
//    _id
//     name
//     email
//     picture
//   }
// }`;

const Login = ({ classes }) => {
  // const [moi, setMoi] = useState({});
  const { state, dispatch } = useContext(MonContext);

  const onSuccess = async googleUser => {
    try {
      // on va recevoir un google user
      // console.log(googleUser);
      //envoyer ca au serveur
      const idToken = googleUser.getAuthResponse().id_token;
      //console.log(idToken);
      const client = new GraphQLClient("http://localhost:4000/graphql", {
        headers: { authorization: idToken }
      });
      console.log(client);
      const { me } = await client.request(ME_QUERY); //data.me
      // console.log(me);
      dispatch({ type: "LOGIN_USER", payload: me });
      dispatch({ type: "IS_LOGGED_IN", payload: googleUser.isSignedIn() }); //methode google bool return
      // setMoi(me);
    } catch (error) {
      onFailure(error);
    }
  };

  const onFailure = err => {
    console.error("erreur au login", err);
  };
  // const { name, email, picture } = moi;
  // console.log(state);
  return (
    <div className={classes.root}>
      <Typography
        component="h1"
        variant="h3"
        gutterBottom
        noWrap
        style={{ color: "rgb(66,133,244)" }}>
        Bienvenue {state.currentUser && state.currentUser.name.toLowerCase()}
      </Typography>
      <GoogleLogin
        clientId="755010499514-bc21hkimmlobfi4t33laso64r9knkljt.apps.googleusercontent.com"
        onSuccess={onSuccess}
        onFailure={onFailure}
        isSignedIn={true}
        buttonText="Se connecter avec Google"
        // theme={"dark"}
      />

      {state.currentUser && (
        <>
          <hr />
          <img
            src={state.currentUser.picture}
            alt={state.currentUser.name}
            style={{ borderRadius: "100%" }}
          />
        </>
      )}
    </div>
  );
};

const styles = {
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    transform: "translateY(-80px)"
  }
};

export default withStyles(styles)(Login);
