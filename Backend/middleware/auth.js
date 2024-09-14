const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  //Get the user from JWT token and add it to req object.
  const authToken = req.header("auth-token");
  console.log("Token: ", authToken);
  if (!authToken) {
    res.status(401).send({ error: "Please authenticate with a valid Token" });
  }
  try {
    data = jwt.verify(authToken, "IamTHE$007");
    console.log(data);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please Authenticate with a valid Token" });
  }
};

module.exports = { auth };
