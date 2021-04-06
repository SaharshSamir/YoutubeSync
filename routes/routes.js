const appRoutes = app => {
    app.get("/", (req, res) => {
        res.send({ hi: "there" });
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
}

module.exports = appRoutes;