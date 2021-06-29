const token = require("morgan");
const { randomPinNumber } = require("../../utils/random_generator");
const {ResetPinSchema} = require("./Reset_Pin_schema");

const setPassResetPin = async (email) => {
  const pinLength = 6;
  const randPin = await randomPinNumber(pinLength);

  const resetObj = {
    email,
    pin: randPin,
  };

  return new Promise((resolve, reject) => {
    ResetPinSchema(resetObj)
      .save()
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

module.exports = {
  setPassResetPin,
};
