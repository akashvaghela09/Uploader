const mongoose = require("mongoose");

const filesUploadSchema = new mongoose.Schema(
    {
        email: {type:String, required: true},
        code: {type:String, required: true},
        adminCode: {type:String, required: true},
        fileName: {type:String, required: true},
        fileSize: {type:Number, required: true},
        md5: {type:String, required: true},
        directLink: {type:String, required: true},
        downloadPage: {type:String, required: true}
    }, 
    { versionKey: false }
)

const FileUpload = mongoose.model("file", filesUploadSchema);

module.exports = {FileUpload}