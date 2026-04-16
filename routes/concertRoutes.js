const express =require("express")
const { getconcert, getconcertbyid, createconcert, updateconcert, deleteconcert } = require("../controllers/concertcontroller")
const router=express.Router()
//GET
router.get("/",getconcert)
router.get("/:id",getconcertbyid)
//POST
router.post("/",createconcert)
//PUT
router.put("/:id",updateconcert)
//DELETE
router.delete("/:id",deleteconcert)

module.exports=router