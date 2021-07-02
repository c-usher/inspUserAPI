const { UserSchema } = require("./User_schema");

const insertUser = (userObj) => {
  return new Promise((resolve, reject) => {
    UserSchema(userObj)
      .save()
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    try {
      if (!email) return false;
      UserSchema.findOne({ email }, (error, data) => {
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

const getUserById = (_id) => {
  return new Promise((resolve, reject) => {
    try {
      if (!_id) return false;
      User.findOne({ _id }, (error, data) => {
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
      UserSchema.findOneAndUpdate(
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

const updatePassword = (email, newHashedPass) => {
  return new Promise((resolve, reject) => {
    try {
      UserSchema.findOneAndUpdate(
        { email }, //First object is filter
        {
          $set: { password: newHashedPass }, //$set is database prefix
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
  getUserById,
  storeUserRefreshJWT,
  updatePassword,
};
