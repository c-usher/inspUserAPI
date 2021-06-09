const {Test} = "./User_schema.js"

const insertUser = (userObj) => {
  Test(userObj)
    .save()
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
};

module.exports = {
    insertUser
}