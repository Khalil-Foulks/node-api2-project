const express = require("express");

const db = require("../data/db");

const router = express.Router();

router.get("/", (req, res) => {
    db.find(req.query)
        .then( database =>{
            res.status(200).json({ database })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "The posts information could not be retrieved." })
        })
})

module.exports = router;

