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
  date_of_birth:{
    type: Date,
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
  created_on: {
    type: Number,
  },
  updated_on: {
    type: Number,
  },
});
module.exports = mongoose.model("User", UserSchema);