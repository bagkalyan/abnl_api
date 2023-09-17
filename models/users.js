var mongoose = require("mongoose");
const moment = require("moment");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  first_name: {
    type: String,
    default: "",
  },
  last_name: {
    type: String,
    default: "",
  },
  date_of_birth: {
    type: Date,
    default: "",
  },
  blood_group: {
    type: String,
    default: "",
  },
  user_role: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  mobile_number: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    default: "",
  },
  pin_code: {
    type: String,
    default: "",
  },
  alter_mobile_number: {
    type: String,
    default: "",
  },
  alter_relation_name: {
    type: String,
    default: "",
  },
  is_blood_pressure: {
    type: Boolean,
    default: false,
  },
  is_blood_sugar: {
    type: Boolean,
    default: false,
  },
  other_medical_issue: {
    type: String,
    default: "",
  },
  vehicle_model: {
    type: String,
    default: "",
  },
  vehicle_registration_number: {
    type: String,
    default: "",
  },
  driving_license_number: {
    type: String,
    default: "",
  },
  driving_license_number_valid_date: {
    type: Date,
    default: "",
  },
  driving_experience: {
    type: Number,
    default: "",
  },
  created_on: {
    type: Number,
  },
  updated_on: {
    type: Number,
  },
  is_approved: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("User", UserSchema);
