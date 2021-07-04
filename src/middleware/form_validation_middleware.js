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

//! \/ DELETE THIS !! \/
//! const unitAddedBy = Joi.string().alphanum().min(2).max(50).required();
//! const cleanStatus = Joi.boolean().required();
//! const inHouseStatus = Joi.boolean().required();
//! const managedStatus = Joi.boolean().required();
//! const note = Joi.string().min(2).max(1000).required();
//! const noteAddedBy = Joi.string().alphanum().min(2).max(50).required();
//! const noteStatus = Joi.boolean().required();
//! const prefAddedBy = Joi.string().alphanum().min(2).max(50).required();
//! const pref = Joi.string().min(2).max(1000).required();
//! /\ DELETE THIS !! /\

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
    sender: "Prem",
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
  console.log(value);

  if (value.error) {
    return res.json({ status: "error", message: value.error.message });
  }
  next();
};
module.exports = {
  resetPassReqValidation,
  updatePassValidation,
  newUnitValidation,
};
