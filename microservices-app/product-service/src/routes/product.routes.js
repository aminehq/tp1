const express = require("express"); 
const router = express.Router(); 
const authMiddleware = require("../middlewares/auth.middleware"); 
const adminMiddleware = require("../middlewares/admin.middleware"); 
const { 
createProduct, 
getAllProducts, 
getProductById, 
updateProduct, 
deleteProduct, 
} = require("../controllers/product.controller"); 
router.post("/", authMiddleware, adminMiddleware, createProduct); 
router.get("/", getAllProducts); 
router.get("/:id", getProductById); 
router.put("/:id", authMiddleware, adminMiddleware, updateProduct); 
router.delete("/:id", authMiddleware, adminMiddleware, deleteProduct); 
module.exports = router;