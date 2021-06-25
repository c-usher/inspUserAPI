const User = require('./User_schema')

const insertUser = (userObj) => {
  return new Promise((resolve, reject) => {
     User(userObj)
    .save()
    .then(data => resolve(data))
    .catch(error => reject(error));
  })
 
};

module.exports = {
    insertUser
}