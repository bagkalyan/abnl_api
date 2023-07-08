const helper = require("../../services/helper");
const userModel = require("./userModel");

module.exports = {
  register: async function (req, res) {
    let {
      first_name,
      last_name,
      date_of_birth,
      mobile_number,
      address,
      city,
      pin_code,
      password,
    } = req.body;

    console.log("register : " + first_name + " " + last_name);

    let response = {};
    if (!first_name) {
      response = helper.showAck(false, messages.USER_NAME_ERROR);
      return helper.showResponse(res, 200, response);
    }
    if (!last_name) {
      response = helper.showAck(false, messages.USER_NAME_ERROR);
      return helper.showResponse(res, 200, response);
    }
    if (!date_of_birth) {
      response = helper.showAck(false, messages.USER_NAME_ERROR);
      return helper.showResponse(res, 200, response);
    }
    if (!password) {
      response = helper.showAck(false, messages.USER_PASSWORD_ERROR);
      return helper.showResponse(res, 200, response);
    }
    response = await userModel.register(req.body);
    return helper.showResponse(res, 200, response);
  },
};
