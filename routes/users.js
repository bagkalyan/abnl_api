var express = require("express");
var router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
var user_controller = require("../controllers/users");

router.post("/register", user_controller.register);
router.post("/login", user_controller.login);
router.post("/approve_user", user_controller.approve_user);
router.post("/approved_users", user_controller.approved_users);
router.post("/approving_users", user_controller.approving_users);

module.exports = router;
