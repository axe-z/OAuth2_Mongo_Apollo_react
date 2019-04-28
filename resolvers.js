const { AuthenticationError } = require("apollo-server");

const authenticated = next => (root, args, ctx, info) => {
  // console.log(ctx);
  if (!ctx.currentUser) {
    // console.log("in");
    throw new AuthenticationError("vous devez etre enregistré");
  }
  // console.log("yay");
  return next(root, args, ctx, info);
};

//on va chercher le data du context
module.exports = {
  Query: {
    me: authenticated((root, args, ctx, info) => ctx.currentUser)
  }
};
