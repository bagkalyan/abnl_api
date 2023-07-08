var express = require("express");
var router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
var user_controller = require("../controllers/users");

router.post("/register", user_controller.register);

module.exports = router;
