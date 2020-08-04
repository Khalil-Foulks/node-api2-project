const express = require("express")

const postsRouter = require("./posts/posts-router")

const server = express();

server.use(express.json())

server.get("/", (req, res) => {
    res.send(`
    <h2>Lambda API Project 2</h>
    <p>Welcome to the Lambda API Project 2</p>
  `);
});

server.use("/api/posts", postsRouter)

server.listen(8000, () => {
    console.log("\n*** Server Running on http://localhost:8000 ***\n");
})