const bcryptjs = require("bcryptjs");
const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");

const { JWT_EXPIRE, JWT_SECRET } = require("../config");
// const req = require("express/lib/request");


const AuthSchema = new Schema({
    username: {
        type: String,
        // required: [true, "Please add a Username"],
    },
    email: {
        type: String,
        unique: true,
        // required: [true, "please add email address"],
    },
    password: {
        type: String,
        // required: [true, "Please add Password"],
    },
    role: {
        type: String,
        enum: ["user", "publisher", "admin"],
        // default: "user",
    }
}, {
    timestamps: true
}
);

// Encoding Password
AuthSchema.pre("save", async function () {
    let encode = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, encode);
});

// getJWTtoken Custom method
AuthSchema.methods.getJWTtoken = function () {
    return jwt.sign({ id: this._id }, JWT_SECRET, { expiresIn: JWT_EXPIRE });
};

module.exports = model("user", AuthSchema);