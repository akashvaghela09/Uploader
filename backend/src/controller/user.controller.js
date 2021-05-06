const express = require("express")
const router = express.Router()
const {UserUpload} = require("../model/user.model")
const bcrypt = require("bcrypt")

router.get("/", async (req, res) => {
    const user = await UserUpload.find().lean().exec();
    return res.status(200).json({data: user})
})

router.post("/", async (req, res) => {
    try {
        bcrypt.hash(req.body.password, 10, function(err, hash) {
            let userbody = {
                "name": req.body.name,
                "email": req.body.email,
                "password": hash
            }
            const user = UserUpload.create(userbody);
            return res.status(201).json({data: userbody})
        });
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
})

router.get("/:id", async (req, res) => {
    try {
        const user = await UserUpload.findById(req.params.id).lean().exec()
        return res.status(200).json({data: user})
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
})

router.patch("/:id", async (req, res) => {
    try {
        const user = await UserUpload.findByIdAndUpdate(req.params.id, req.body, { new: true}).lean().exec()
        return res.status(200).json({data: user})
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const user = await UserUpload.findByIdAndDelete(req.params.id).lean().exec()
        return res.status(200).json({data: user})
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
})

module.exports = router