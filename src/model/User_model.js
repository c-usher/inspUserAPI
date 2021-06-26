const User = require("./User_schema");

const insertUser = (userObj) => {
  return new Promise((resolve, reject) => {
    User(userObj)
      .save()
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    try {
      if (!email) return false;
      User.findOne({ email }, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

const storeUserRefreshJWT = (_id, token) => {
  return new Promise((resolve, reject) => {
    try {
      User.findOneAndUpdate(
        { _id }, //First object is filter
        {
          $set: { "refreshJWT.token": token, "refreshJWT.addedAt": Date.now() }, //$set is database prefix
        },
        { new: true }
      )
        .then((data) => resolve(data))
        .catch((error) => {
          console.log(error), reject(error);
        });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

module.exports = {
  insertUser,
  getUserByEmail,
  storeUserRefreshJWT,
};
