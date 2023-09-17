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
  alter_mobile_number: 1,
  alter_relation_name: 1,
  is_blood_pressure: 1,
  is_blood_sugar: 1,
  other_medical_issue: 1,
  vehicle_model: 1,
  vehicle_registration_number: 1,
  driving_license_number: 1,
  driving_license_number_valid_date: 1,
  driving_experience: 1,
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
      alter_mobile_number,
      alter_relation_name,
      is_blood_pressure,
      is_blood_sugar,
      other_medical_issue,
      vehicle_model,
      vehicle_registration_number,
      driving_license_number,
      driving_license_number_valid_date,
      driving_experience,
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
      alter_mobile_number,
      alter_relation_name,
      is_blood_pressure,
      is_blood_sugar,
      other_medical_issue,
      vehicle_model,
      vehicle_registration_number,
      driving_license_number,
      driving_license_number_valid_date,
      driving_experience,
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
    let { curOffset, perPage } = data;

    let filter = {
      user_role: "user",
      is_approved: true,
    };

    let users = await User.aggregate()
      .match(filter)
      .project(user_fields)
      .sort({ created_on: -1 })
      .skip(curOffset)
      .limit(perPage);

    let response = helper.showAck(true, messages.USER_SUCCESS);
    response.data = users;
    return response;
  },
  approving_users: async function (data) {
    let { curOffset, perPage } = data;

    let filter = {
      user_role: "user",
      is_approved: false,
    };

    let users = await User.aggregate()
      .match(filter)
      .project(user_fields)
      .sort({ created_on: -1 })
      .skip(curOffset)
      .limit(perPage);

    let response = helper.showAck(true, messages.USER_SUCCESS);
    response.data = users;
    return response;
  },
  approving_user: async function (data) {
    let { mobile_number } = data;

    let user_data = {
      mobile_number,
      is_approved: false,
    };
    let user = await User.findOne(user_data, user_fields);
    if (user) {
      if (!user.is_approved) {
        let response = helper.showAck(true, messages.USER_SUCCESS);
        response.data = user;
        return response;
      } else {
        return helper.showAck(false, messages.USER_APPROVED);
      }
    }
    return helper.showAck(false, messages.USER_ERROR);
  },
  approved_user: async function (data) {
    let { mobile_number } = data;

    let user_data = {
      mobile_number,
      is_approved: true,
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
    return helper.showAck(false, messages.USER_ERROR);
  },
};
