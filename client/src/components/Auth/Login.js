// eslint-disable-next-line
import React, { useState, useContext } from "react";
import { GraphQLClient } from "graphql-request";
import { withStyles } from "@material-ui/core/styles";
import { GoogleLogin } from "react-google-login";
import MonContext from "../../context";
// import Typography from "@material-ui/core/Typography";

const ME_QUERY = `
{
  me {
   _id
    name
    email
    picture
  }
}`;

const Login = ({ classes }) => {
  // const [moi, setMoi] = useState({});
  const { state, dispatch } = useContext(MonContext);

  const onSuccess = async googleUser => {
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
    // setMoi(me);
  };
  // const { name, email, picture } = moi;
  console.log(state);
  return (
    <div>
      <GoogleLogin
        clientId="755010499514-bc21hkimmlobfi4t33laso64r9knkljt.apps.googleusercontent.com"
        onSuccess={onSuccess}
        isSignedIn={true}
      />

      {/* {moi && (
        <>
          <p>{name}</p>
          <p>{email}</p>
          <img src={picture} alt={name} style={{ borderRadius: "100%" }} />
        </>
      )} */}
    </div>
  );
};

const styles = {
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  }
};

export default withStyles(styles)(Login);
