const express = require("express")
const { inscriptioncontroller, connexioncontroller } = require("../controllers/userController")
const router = express.Router()

router.post("/register",inscriptioncontroller)
router.post("/login",connexioncontroller)
module.exports = router