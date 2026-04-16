require("dotenv").config()
const express = require("express")
const { connectDB } = require("./config/db")
const app = express()
const stageRoute = require("./routes/StageRoutes")
const artistRoute = require("./routes/ArtistRoutes")
const concertRoute = require("./routes/ConcertRoutes")
app.use(express.json())
connectDB().then(()=>{
    console.log("Connected to MongoDB")
    app.listen(process.env.PORT,()=>{
        console.log(`Server is running on port ${process.env.PORT}`)
    })
}).catch((err)=>{
    console.log("Error connecting to MongoDB",err.message)
})