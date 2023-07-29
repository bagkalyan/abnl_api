var User = require("./../../models/users");
const helper = require("../../services/helper");
const messages = require("./messages");
const moment = require("moment");

const user_fields = {
  first_name: 1,
  last_name: 1,
  date_of_birth: 1,
  blood_group: 1,
  user_role: 1,
  email: 1,
  mobile_number: 1,
  address: 1,
  city: 1,
  pin_code: 1,
  is_approved: 1,
};

module.exports = {
  register: async function (data) {
    let {
      first_name,
      last_name,
      date_of_birth,
      mobile_number,
      email,
      address,
      city,
      pin_code,
      password,
      blood_group,
    } = data;

    let user_data = {
      first_name,
      last_name,
      date_of_birth,
      user_role: "user",
      mobile_number,
      email,
      address,
      city,
      pin_code,
      password,
      blood_group,
      created_on: moment().unix(),
      updated_on: moment().unix(),
    };
    let user = await User.findOne({ mobile_number: mobile_number });
    if (user) {
      return helper.showAck(false, messages.USER_ALREADY);
    }
    let new_user = new User(user_data);
    await new_user.save();
    return helper.showAck(true, messages.USER_CREATE_SUCCESS);
  },
  login: async function (data) {
    let { mobile_number, password } = data;
    let user_data = {
      mobile_number,
      password,
    };
    let user = await User.findOne(user_data, user_fields);
    if (user) {
      if (user.is_approved) {
        let response = helper.showAck(true, messages.USER_SUCCESS);
        response.data = user;
        return response;
      } else {
        return helper.showAck(false, messages.USER_APPROVAL_PENDING);
      }
    }
    return helper.showAck(false, messages.USER_LOGIN_ERROR);
  },
  approve_user: async function (data) {
    let { mobile_number } = data;

    let user = await User.findOne({ mobile_number: mobile_number });
    if (user) {
      if (!user.is_approved) {
        let update_data = {
          is_approved: true,
          updated_on: moment().unix(),
        };

        let user_filter = {
          mobile_number: mobile_number,
        };

        await User.updateOne(user_filter, update_data);

        let response = helper.showAck(true, messages.USER_APPROVE_SUCCESS);

        return response;
      } else {
        return helper.showAck(false, messages.USER_APPROVED);
      }
    }
    return helper.showAck(false, messages.USER_ERROR);
  },
  approved_users: async function (data) {
    let { page_number, page_size } = data;

    let page_offset = (page_number - 1) * page_size;

    let filter = {
      user_role: "user",
      is_approved: true,
    };

    let users = await User.aggregate()
      .match(filter)
      .project(user_fields)
      .sort({ created_on: -1 })
      .skip(page_offset)
      .limit(page_size);

    let response = helper.showAck(true, messages.USER_SUCCESS);
    response.data = users;
    return response;
  },
  approving_users: async function (data) {
    let { page_number, page_size } = data;

    let page_offset = (page_number - 1) * page_size;

    let filter = {
      user_role: "user",
      is_approved: false,
    };

    let users = await User.aggregate()
      .match(filter)
      .project(user_fields)
      .sort({ created_on: -1 })
      .skip(page_offset)
      .limit(page_size);

    let response = helper.showAck(true, messages.USER_SUCCESS);
    response.data = users;
    return response;
  },
};
