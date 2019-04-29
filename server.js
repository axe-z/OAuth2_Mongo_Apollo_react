const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
require("dotenv").config(); //amene la config sur process.env

const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const { findOrCreateUser } = require("./controllers/userController");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true //c est pour enlever un message de depracation
  })
  .then(() => console.log("db connectée"))
  .catch(e => console.log(e));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  //intercepter la request de react
  context: async ({ req }) => {
    //rammasser les call d auth

    let authToken = null;
    let currentUser = null;
    try {
      authToken = req.headers.authorization;
      if (authToken) {
        ///trouver ou creer le user dans notre DB
        currentUser = await findOrCreateUser(authToken);
        console.log(currentUser);
      }
    } catch (error) {
      console.log(error, "incapable de verifier votre compte");
    }
    return { currentUser };
  }
});

server.listen().then(({ url }) => console.log("ca roule sur", url));
