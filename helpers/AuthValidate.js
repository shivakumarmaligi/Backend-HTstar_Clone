const joi = require("joi");

const storage = joi.object({
    username: joi.string().min(6).required(),
    email: joi.string().email().required(),
    password: joi.string().alphanum().min(5).required(),
    role: joi.string()
});

module.exports = { storage };