const express =require("express")
const { getstage, getstagebyid, createstage, updatestage, deletestage, getartistBystage } = require("../controllers/stageController")
const { authMiddleware } = require("../middlewares/authmiddleware")
const { adminMiddleware } = require("../middlewares/adminmiddleware")
const router=express.Router()
//GET
router.get("/",authMiddleware, getstage)
router.get("/:id/artists",authMiddleware, getartistBystage)
router.get("/:id",authMiddleware, getstagebyid)
//POST
router.post("/",authMiddleware, adminMiddleware, createstage)
//PUT
router.put("/:id",authMiddleware, adminMiddleware, updatestage)
//DELETE
router.delete("/:id",authMiddleware, adminMiddleware, deletestage)
module.exports=router