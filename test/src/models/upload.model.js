const mongoose = require("mongoose")

const uploadSchema = new mongoose.Schema ({
    name: {type: String, required: true},
    image_url: [{ type: String, required: true}]
})

module.exports = mongoose.model("upload", uploadSchema)