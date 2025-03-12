const express = require("express")
const router = express.Router();
const tokenValidation = require("../middleware/validation");
const {registerUser, loginUser, currentUser, currentUserUpdate} = require("../controllers/userController.js")

router.route('/register').post(registerUser)

router.route('/login').post(loginUser)

router.route('/current').get(tokenValidation , currentUser).put( tokenValidation, currentUserUpdate)

module.exports = router
