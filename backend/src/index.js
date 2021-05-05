const express = require("express");
const app = express();
const filesUploadController = require("./controller/filesUpload.controller")

app.use(express.json())

app.use("/files", filesUploadController)

module.exports = {
    app
}