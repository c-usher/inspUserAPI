const token = require("morgan");
const { randomPinNumber } = require("../../utils/random_generator");
const { ResetPinSchema } = require("./Reset_Pin_schema");

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

const getPinByEmail = (email, pin) => {
  return new Promise((resolve, reject) => {
    try {
      ResetPinSchema.findOne({ email, pin }, (error, data) => {
        if (error) {
          console.log(error);
          resolve(false);
        }
        resolve(data);
      });
    } catch (error) {
      reject(error);
      console.log(error);
    }
  });
};

const delPin = (email, pin) => {
  try {
    ResetPinSchema.findOneAndDelete({ email, pin }, (error, data) => {
      if (error) {
        console.log(error);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  setPassResetPin,
  getPinByEmail,
  delPin,
};
