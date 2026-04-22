const express =require("express")
const { getconcert, getconcertbyid, createconcert, updateconcert, deleteconcert } = require("../controllers/concertcontroller")
const { authMiddleware } = require("../middlewares/authmiddleware")
const { adminMiddleware } = require("../middlewares/adminmiddleware")
const router=express.Router()
//GET
router.get("/",authMiddleware, getconcert)
router.get("/:id",authMiddleware, getconcertbyid)
//POST
router.post("/",authMiddleware,adminMiddleware, createconcert)
//PUT
router.put("/:id",authMiddleware, adminMiddleware, updateconcert)
//DELETE
router.delete("/:id",authMiddleware, adminMiddleware, deleteconcert)

module.exports=router