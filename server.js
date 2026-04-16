const express = require("express")

const stageroute = require("./routes/StageRoutes")
const artistsroute = require("./routes/artistsRoutes")
const concertroute = require("./routes/concertRoutes")

const app = express()

app.use(express.json())

// routes
app.use("/stage", stageroute)
app.use("/artists", artistsroute)
app.use("/concert", concertroute)

app.listen(3000, () => {
    console.log("Server running on port 3000")
})