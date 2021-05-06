const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {type:String, required: true},
        email: {type:String, required: true},
        password: {type:String, required: true}
    }, 
    { versionKey: false }
)

const UserUpload = mongoose.model("user", userSchema);

module.exports = {UserUpload}