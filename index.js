const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;
const socket = require("socket.io");

const io = socket(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on('connection', socket => {
    console.log('user has connected');
})

app.get("/", (req, res) => {
    res.send({ hi: "there" });
})

app.get("/room/:id", (req, res) => {
    res.send({
        "roomId": req.params.id
    })
})

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})