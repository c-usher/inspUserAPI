const { UnitSchema } = require("./Unit_schema");

const addUnit = (unitObj) => {
  return new Promise((resolve, reject) => {
    try {
      UnitSchema(unitObj)
        .save()
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

const getUnits = (clientId) => {
  return new Promise((resolve, reject) => {
    try {
      UnitSchema.find(clientId)
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  addUnit,
  getUnits,
};
