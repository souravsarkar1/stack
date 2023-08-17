const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    pass: String,
    avater: String,

}, {
    versionKey: false,
    timestamps: true
})

const UserModel = mongoose.model("user",userSchema);


module.exports ={UserModel};