const express = require("express")
const multer = require("multer")
const app = express()

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './files')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    }
})

const upload = multer({ storage: fileStorageEngine });

app.post("/", upload.single("file"), (req, res) => {
    console.log(req.file);
    res.send("Single file uploaded success")
})

app.listen(process.env.PORT || 8000, () => {
    console.log("Server started");
})