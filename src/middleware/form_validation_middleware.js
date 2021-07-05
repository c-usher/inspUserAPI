const Joi = require("joi");

const email = Joi.string().email({
  minDomainSegments: 2,
  tlds: { allow: ["com", "net"] },
});
const pin = Joi.number().min(100000).max(999999);
const newPassword = Joi.string().alphanum().min(3).max(30);
const unitNum = Joi.string().alphanum().min(3).max(5).required();
const bool = Joi.boolean();
const shortStr = Joi.string().min(2).max(50);
const longStr = Joi.string().min(2).max(1000);

const resetPassReqValidation = (req, res, next) => {
  const schema = Joi.object({ email });

  const value = schema.validate(req.body);
  if (value.error) {
    return res.json({ status: "error", message: value.error.message });
  }
  next();
};

const updatePassValidation = (req, res, next) => {
  const schema = Joi.object({ email, pin, newPassword });

  const value = schema.validate(req.body);
  if (value.error) {
    return res.json({ status: "error", message: value.error.message });
  }
  next();
};

const newUnitValidation = (req, res, next) => {
  const schema = Joi.object({
    unitAddedBy: shortStr.required(),
    unitNum,
    cleanStatus: bool.required(),
    inHouseStatus: bool.required(),
    managedStatus: bool.required(),
    note: longStr.required(),
    noteAddedBy: shortStr.required(),
    noteStatus: bool.required(),
    prefAddedBy: shortStr.required(),
    pref: longStr.required(),
  });

  const value = schema.validate(req.body);

  if (value.error) {
    console.log(value.error);
    return res.json({ status: "error", message: value.error.message });
  }
  next();
};

const newNoteValidation = (req, res, next) => {
  const schema = Joi.object({
    note: longStr.required(),
    noteAddedBy: shortStr.required(),
    noteStatus: bool,
  });

  const value = schema.validate(req.body);

  if (value.error) {
    console.log(value.error);
    return res.json({ status: "error", message: value.error.message });
  }
  next();
};

const newPrefValidation = (req, res, next) => {
  const schema = Joi.object({
    prefAddedBy: shortStr.required(),
    pref: longStr.required(),
  });

  const value = schema.validate(req.body);

  if (value.error) {
    console.log(value.error);
    return res.json({ status: "error", message: value.error.message });
  }
  next();
};

module.exports = {
  resetPassReqValidation,
  updatePassValidation,
  newUnitValidation,
  newNoteValidation,
  newPrefValidation,
};
