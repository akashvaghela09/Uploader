const express = require("express");
const app = express();
const cors = require('cors');
const filesUploadController = require("./controller/filesUpload.controller")
const userController = require("./controller/user.controller")

app.use(express.json())
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use("/files", filesUploadController)
app.use("/users", userController)

module.exports = {
    app
}