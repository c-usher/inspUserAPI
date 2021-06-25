const jwt = require("jsonwebtoken");

const createAccessJWT = (payload) => {
  const accessJWT = jwt.sign({ payload }, process.env.JWT_ACCESS_SECRET);

  return Promise.resolve(accessJWT);
};

const createRefreshJWT = (payload) => {
  const refreshJWT = jwt.sign({ payload }, process.env.JWT_REFRESH__SECRET);

  return Promise.resolve(refreshJWT);
};
