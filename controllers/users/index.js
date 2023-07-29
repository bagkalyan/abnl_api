const helper = require("../../services/helper");
const userModel = require("./userModel");
const messages = require("./messages");

module.exports = {
  register: async function (req, res) {
    let { first_name, last_name, date_of_birth, mobile_number, password } =
      req.body;

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
    if (!mobile_number) {
      response = helper.showAck(false, messages.MOBILE_NUMBER_ERROR);
      return helper.showResponse(res, 200, response);
    }
    if (!password) {
      response = helper.showAck(false, messages.USER_PASSWORD_ERROR);
      return helper.showResponse(res, 200, response);
    }
    response = await userModel.register(req.body);
    return helper.showResponse(res, 200, response);
  },
  login: async function (req, res) {
    let { mobile_number, password } = req.body;
    let response = {};
    if (!mobile_number) {
      response = helper.showAck(false, messages.MOBILE_NUMBER_ERROR);
      return helper.showResponse(res, 200, response);
    }
    if (!password) {
      response = helper.showAck(false, messages.USER_PASSWORD_ERROR);
      return helper.showResponse(res, 200, response);
    }
    response = await userModel.login(req.body);
    return helper.showResponse(res, 200, response);
  },
  approve_user: async function (req, res) {
    let { mobile_number } = req.body;
    let response = {};
    if (!mobile_number) {
      response = helper.showAck(false, messages.MOBILE_NUMBER_ERROR);
      return helper.showResponse(res, 200, response);
    }
    response = await userModel.approve_user(req.body);
    return helper.showResponse(res, 200, response);
  },
  approved_users: async function (req, res) {
    let response = await userModel.approved_users(req.body);
    return helper.showResponse(res, 200, response);
  },
  approving_users: async function (req, res) {
    let response = await userModel.approving_users(req.body);
    return helper.showResponse(res, 200, response);
  },
};
