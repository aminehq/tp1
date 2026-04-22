const express =require("express")
const { getartist, getartistbyid, createartist, updateartist, deleteartist, searchartist, getConcertsByArtist } = require("../controllers/artistController")
const { authMiddleware } = require("../middlewares/authmiddleware")
const { adminMiddleware } = require("../middlewares/adminmiddleware")
const router=express.Router()
//GET
router.get("/",authMiddleware, getartist)
//SEARCH
router.get("/search",authMiddleware, searchartist)
router.get("/:id/concerts",authMiddleware, getConcertsByArtist)
router.get("/:id",authMiddleware, getartistbyid)
//POST
router.post("/",authMiddleware,adminMiddleware, createartist)
//PUT
router.put("/:id",authMiddleware, adminMiddleware, updateartist)
//DELETE
router.delete("/:id",authMiddleware, adminMiddleware, deleteartist)

module.exports=router
