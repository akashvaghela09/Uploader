const express = require("express")
const router = express.Router()
const {UserUpload} = require("../model/user.model")
const bcrypt = require("bcrypt")

// Get User
router.get("/", async (req, res) => {
    const user = await UserUpload.find().lean().exec();
    return res.status(200).json({data: user})
})

// Get Single User
router.get("/:id", async (req, res) => {
    try {
        const user = await UserUpload.findById(req.params.id).lean().exec()
        return res.status(200).json({data: user})
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
})

// Post User
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

// Login method
router.post("/login", async (req, res) => {
    try {
        const user = await UserUpload.findOne({email :req.body.email}).lean().exec();

        // Compare User password with Hash String
        bcrypt.compare(req.body.password, user.password, function(err, result) {
            if(result == true){
                let data = {
                    response: true,
                    name: user.name,
                    email: user.email,
                    message: "User Authenticated Successfully"
                }
                return res.status(200).json({data})
            } else {
                let data = {
                    response: false,
                    message: "User Authenticated Failed"
                }
                return res.status(500).json({data})
            }
        });
    } catch {
        return res.status(404).json({message: "User Not Found"})
    }
})

// Update User
router.patch("/:id", async (req, res) => {
    try {
        const user = await UserUpload.findByIdAndUpdate(req.params.id, req.body, { new: true}).lean().exec()
        return res.status(200).json({data: user})
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
})


// Delete User
router.delete("/:id", async (req, res) => {
    try {
        const user = await UserUpload.findByIdAndDelete(req.params.id).lean().exec()
        return res.status(200).json({data: user})
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
})

module.exports = router