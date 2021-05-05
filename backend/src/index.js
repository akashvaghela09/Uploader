const express = require("express");
const app = express();
const postController = require("./controller/post.controller")

app.use(express.json())

app.use("/content", postController)

module.exports = {
    app
}