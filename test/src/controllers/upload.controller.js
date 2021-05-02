const express = require("express")

const router = express.Router();

router.post("/single", async (req, res) => {
    res.send("single")
})

module.exports = router;