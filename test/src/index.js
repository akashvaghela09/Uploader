const express = require("express")
const uploadController = require("./controllers/upload.controller")
const app = express()

app.use(express.json())

app.use("/upload", uploadController)
module.exports = {app}