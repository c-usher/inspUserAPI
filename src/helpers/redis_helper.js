const redis = require("redis");
const client = redis.createClient(process.env.REDIS_URL);

client.on("error", function (error) {
  console.error(error);
});

const setJWT = (key, value) => {
  return new Promise((resolve, reject) => {
    try {
      client.set(key, value, (error, response) => {
        if (error) reject(error);
        resolve(response);
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getJWT = (key) => {
  return new Promise((resolve, reject) => {
    try {
      client.get(key, (error, response) => {
        if (error) reject(error);
        resolve(response);
      });
    } catch (error) {
      reject(error);
    }
  });
};

const delJWT = (key) => {
  try {
    client.del(key);
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  setJWT,
  getJWT,
  delJWT,
};
