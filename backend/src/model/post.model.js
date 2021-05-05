const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    id: Number,
    title: String,
    content: String,
    author_name: String
})

const Post = mongoose.model("content", postSchema);

module.exports = {Post}