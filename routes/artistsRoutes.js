const express =require("express")
const { getartist, getartistbyid, createartist, updateartist, deleteartist, searchartist, getConcertsByArtist } = require("../controllers/artistcontroller")
const router=express.Router()
//GET
router.get("/",getartist)
//SEARCH
// router.get("/search",searchartist)
// router.get("/:id/concerts",getConcertsByArtist)
router.get("/:id",getartistbyid)
//POST
router.post("/",createartist)
//PUT
router.put("/:id",updateartist)
//DELETE
router.delete("/:id",deleteartist)

module.exports=router