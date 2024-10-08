const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  //Get the user from JWT token and add it to req object.
  const authToken = req.header("Authorization");


  if (!authToken) {
    return res.status(401).send({ error: "Please authenticate with a valid Token" });
  }
  try {
    data = jwt.verify(authToken, "IamTHE$007");
    req.user = data.user;
    next();
  } catch (error) {
    return res.status(401).send({ error: "Please Authenticate with a valid Token" });
  }
};

module.exports = { auth };
