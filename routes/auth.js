const { Router } = require("express");
const { Register, Login } = require("../controllers/auth");

const router = Router();

router.route("").post(Register);
router.route("/login").post(Login);

module.exports = router;