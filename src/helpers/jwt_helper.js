const jwt = require("jsonwebtoken");
const { setJWT, getJWT } = require("./redis_helper");

const createAccessJWT = async (email, _id) => {
  try {
     const accessJWT = await jwt.sign({ email }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });
  await setJWT(accessJWT, _id);

  return Promise.resolve(accessJWT);
  } catch (error) {
    return Promise.reject(error);
  }
 
};

const createRefreshJWT = (payload) => {
  const refreshJWT = jwt.sign({ payload }, process.env.JWT_REFRESH__SECRET, {
    expiresIn: "30d",
  });

  return Promise.resolve(refreshJWT);
};

module.exports = {
    createAccessJWT,
    createRefreshJWT
}