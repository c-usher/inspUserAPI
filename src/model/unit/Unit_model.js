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
      UnitSchema.find({ clientId })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

const getUnitById = (_id, clientId) => {
  return new Promise((resolve, reject) => {
    try {
      UnitSchema.find({ _id, clientId })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

const updatePrefs = ({ _id, pref, prefAddedBy }) => {
  return new Promise((resolve, reject) => {
    try {
      UnitSchema.findOneAndUpdate(
        { _id },
        {
          $push: { ownerPrefs: { pref, prefAddedBy } },
        },
        { new: true }
      )
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

const addNote = ({ _id, note, noteAddedBy }) => {
  return new Promise((resolve, reject) => {
    try {
      UnitSchema.findOneAndUpdate(
        { _id },

        {
          noteStatus: false,
          $push: { notes: { note, noteAddedBy } },
        },
        { new: true }
      )
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

const updateStatusNote = ({ _id }) => {
  return new Promise((resolve, reject) => {
    try {
      UnitSchema.findOneAndUpdate(
        {
          notes: {
            $elemMatch: {
              _id: _id,
              noteStatus: false,
            },
          },
        },
        {
          "notes.$.noteStatus": true,
        },
        { new: true }
      )
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
  getUnitById,
  updatePrefs,
  addNote,
  updateStatusNote,
};
