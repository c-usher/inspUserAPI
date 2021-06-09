const User = require('./User_schema')

const insertUser = (userObj) => {
  User(userObj)
    .save()
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
};

module.exports = {
    insertUser
}