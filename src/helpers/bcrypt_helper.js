const bcrypt = require("bcrypt");
const saltRounds = 10;

const hashPassword = (plainPassword) => {
    return new Promise(resolve => {
        resolve(bcrypt.hashSync(plainPassword, saltRounds))
    });
    
}

const comparePassword = (plainPass, passFromDb) => {
    return new Promise((resolve, reject) => {
      // Load hash from your password DB.
      bcrypt.compare(plainPass, passFromDb, function (err, result) {
          if (err) reject(err);
          resolve(result);
      });
    })
}

module.exports = {
  hashPassword,
  comparePassword,
};