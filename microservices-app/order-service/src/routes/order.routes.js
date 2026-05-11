const express = require("express"); 
const router = express.Router(); 
const authMiddleware = require("../middlewares/auth.middleware"); 
const { 
createOrder, 
getAllOrders, 
getMyOrders, 
} = require("../controllers/order.controller"); 
router.post("/", authMiddleware, createOrder); 
router.get("/", authMiddleware, getAllOrders); 
router.get("/me", authMiddleware, getMyOrders); 
module.exports = router; 