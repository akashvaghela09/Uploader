const express = require("express")
const router = express.Router()
const {FileUpload} = require("../model/filesUpload.model")

router.get("/", async (req, res) => {
    const filePackage = await FileUpload.find().lean().exec();
    return res.status(200).json({data: filePackage})
})

router.post("/", async (req, res) => {
    try {
        const filePackage = await FileUpload.create(req.body);
        return res.status(201).json({data: filePackage})
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
})

router.get("/:id", async (req, res) => {
    try {
        const filePackage = await FileUpload.findById(req.params.id).lean().exec()
        return res.status(200).json({data: filePackage})
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
})

router.patch("/:id", async (req, res) => {
    try {
        const filePackage = await FileUpload.findByIdAndUpdate(req.params.id, req.body, { new: true}).lean().exec()
        return res.status(200).json({data: filePackage})
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const filePackage = await FileUpload.findByIdAndDelete(req.params.id).lean().exec()
        return res.status(200).json({data: filePackage})
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
})

module.exports = router