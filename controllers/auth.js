const AuthSchema = require("../models/Auth");
const { success, error, info } = require("consola");
const bcrypt = require("bcryptjs");
const { JWT_COOKIE_EXPIRE } = require("../config/index");
const { storage } = require("../helpers/AuthValidate");


/*
    @ACCESS PUBLIC
    @HTTP REEQUEST POST
    @HTTP URL - api/auth/register
 */

exports.Register = async (req, res) => {
  try {
      // let { username, email, password, role } = req.body;
    const data = await storage.validateAsync(req.body);
    let payload = await new AuthSchema(data);
    //   Save Data to Database
    let userData = await AuthSchema.create(payload);
    // res.status(201).json({ message: " Successfully User Created", userData });
    //   Write Token Logic
      sendResponse(userData, 201, res);
  } catch (err) {
      error(err);
      res.status(501).json({ mesaage: " SERVER ERROR" });
  } 
};

exports.Login = async (req, res) => {
  try {
    let {email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "Email and Password Required" });
    }
    
    let userData = await AuthSchema.findOne({ email }).select("+password");
    if (!userData) {
      return res.status(401).json({ message: "Email Doesn't exists..!!!" });
    }

    let isMatch = await bcrypt.compare(password, userData.password);
    if (!isMatch) {
      return res.status(401).json({ mesaage: "Password Not Matched" });
    }
    sendResponse(userData, 201, res);
  } catch (err) {
    error(err);
  }
};

// JWT Token Logic
function sendResponse(data, statusCode, res) {
    let token = data.getJWTtoken();
    let options = {
        expires: new Date(Date.now() + JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };
    console.log(options);
    res.status(statusCode).cookie("TOKEN", token, options).json({ message: "Successfully Stored", token });
};

