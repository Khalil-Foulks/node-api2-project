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
        const post = database[0]
        console.log(post)

        if(post){
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

router.get("/:id/comments", (req, res) => {
    const id = req.params.id

    db.findById(id)
    .then(database => {
        const post = database[0]
        console.log(post)

        if(post){
            db.findPostComments(post.id)
            .then(comments => {
                res.status(200).json({ comments })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ error: "The posts information could not be retrieved." })
            }) 
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

router.post("/:id/comments", (req, res) => {
    const text = req.body
    const id = req.params.id

    db.findById(id)
    .then(database => {
        const post = database[0]
        console.log(post)

        if(post){
            if(!text.text){
                res.status(400).json({ errorMessage: "Please provide text for the comment." })
            } else {
                db.insertComment(text)
                .then(item => {
                    res.status(201).json({ text }) 
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({ error: "The posts information could not be retrieved." })
                })  
            }   
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." }) 
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: "The posts information could not be retrieved." })
    })  
})

router.delete("/:id", (req, res) => {
    const id = req.params.id
    
    db.remove(id)
    .then(item => {
        if(item) {
            console.log("post deleted")
            res.status(204).end();
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: "The posts information could not be retrieved." })
    }) 
})

router.put("/:id", (req,res) => {
    const id = req.params.id
    const post = req.body

    if(!post.title || !post.contents){
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else{
        db.update(id, post)
        .then(item => {
            if(item > 0) {
                res.status(200).json({ post })
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "The posts information could not be retrieved." })
        }) 
    }
})



module.exports = router;

