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

router.get("/:id", (req, res) => {
    db.findById(req.params.id)
        .then( database =>{
            if(database){
                res.status(200).json({ database })
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "The posts information could not be retrieved." })
        })
})

router.post("/", (req, res) => {
    const post = req.body
    
    if(!post.title || !post.contents){
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else {
        db.insert(post)
        .then(database => {
            res.status(201).json({ post })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "There was an error while saving the post to the database" })
        })
    }
})

module.exports = router;

