const express = require("express")
const router = express.Router()
const {Post} = require("../model/post.model")

router.get("/", async (req, res) => {
    console.log("in Get")
    const post = await Post.find().lean().exec();
    return res.status(200).json({data: post})
})

router.post("/", async (req, res) => {
    try {
        const post = await Post.create(req.body);
        return res.status(201).json({data: post})
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
})

router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).lean().exec()
        return res.status(200).json({data: post})
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
})

router.patch("/:id", async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true}).lean().exec()
        return res.status(200).json({data: post})
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id).lean().exec()
        return res.status(200).json({data: post})
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
})

module.exports = router