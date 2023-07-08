var User = require("./../../models/users");
const helper = require("../../services/helper");
const messages = require("./messages");
const moment = require("moment");

const user_fields = {
  FirstName: 1,
  LastName: 1,
  UserID: 1,
  ParentUserID: 1,
  Email: 1,
  fcmToken: 1,
  socket_id: 1,
  created_at: 1,
  updated_at: 1,
};

module.exports = {
  register: async function (data) {
    let {
      first_name,
      last_name,
      date_of_birth,
      mobile_number,
      address,
      city,
      pin_code,
      password,
    } = data;

    let user_data = {
      first_name,
      last_name,
      date_of_birth,
      user_role: "user",
      mobile_number,
      address,
      city,
      pin_code,
      password,
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
};
