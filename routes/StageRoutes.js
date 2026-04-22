const express =require("express")
const { getstage, getstagebyid, createstage, updatestage, deletestage, getartistBystage } = require("../controllers/stageController")
const router=express.Router()
//GET
router.get("/",getstage)
router.get("/:id/artists",getartistBystage)
router.get("/:id",getstagebyid)
//POST
router.post("/",createstage)
//PUT
router.put("/:id",updatestage)
//DELETE
router.delete("/:id",deletestage)
module.exports=router