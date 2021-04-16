const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const socket = require("socket.io");
const socketReqs = require('./logic/socketReqs');
const domainName = "http://localhost:3000"
app.get("/", (req, res) => {
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    domainName = fullUrl;
    console.log(fullUrl + 'line8');
})
require('./routes/routes')(app);



const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})

app.get('/roomies', (req, res) => {
    res.send({ "Hi": "there" });
})

const io = socket(server, {
    cors: {
        origin: domainName,
        methods: ["GET", "POST"],
        credentials: true
    }
});
socketReqs(io);