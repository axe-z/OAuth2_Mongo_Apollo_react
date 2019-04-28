const User = require("../models/User");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID);

exports.findOrCreateUser = async token => {
  ///verifier le token
  const googleUser = await verifieAuthToken(token);
  //verifier si le user existe
  //console.log(googleUser);
  const user = await verifieSiUserExist(googleUser.email);
  //si il existe return le user , sinon creer le user
  // console.log(user);
  return user ? user : creerNewUser(googleUser);
};

const verifieAuthToken = async token => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.OAUTH_CLIENT_ID
    });
    //console.log(ticket.getPayload());
    return ticket.getPayload();
  } catch (error) {
    console.log(error, "le token n'a pas pu etre verifier");
  }
};

const verifieSiUserExist = async email => await User.findOne({ email }).exec();

const creerNewUser = googleUser => {
  const { name, email, picture } = googleUser;

  const user = {
    name,
    email,
    picture
  };
  // console.log("user", user);
  //save dans mongo
  return new User(user).save();
};
