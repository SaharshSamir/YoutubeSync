const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const socket = require("socket.io");
const socketReqs = require('./logic/socketReqs');
let domainName = "http://localhost:3000"
app.get("/", (req, res) => {
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    domainName = fullUrl;
    console.log(fullUrl + 'line8');
})

app.get("/room/:id", (req, res) => {
    res.send({
        "roomId": req.params.id
    })
})


app.get('/api/endpoint', (req, res) => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development")
    {
        res.send({ ENDPOINT: "http://localhost:5000" })
    } else
    {
        res.send({ ENDPOINT: "" })
    }
})
if (process.env.NODE_ENV === "production")
{
    app.use(express.static("client/build"));

    const path = require("path");
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}
// require('./routes/routes')(app);



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