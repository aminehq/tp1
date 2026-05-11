const Order = require("../models/order.model"); 
const { 
getProductByIdFromProductService, 
} = require("../services/product.service"); 
const createOrder = async (req, res) => { 
try { 
    const { productId, quantity } = req.body; 
   if (!productId || !quantity) { 
        return res.status(400).json({ 
        message: "productId et quantity sont obligatoires", 
     }); 
   } 
 
   const product = await getProductByIdFromProductService(productId); 
 
   if (!product) { 
     return res.status(404).json({ message: "Produit introuvable" }); 
   } 
   if (quantity > product.stock) { 
        return res.status(400).json({ 
           message: "Stock insuffisant", 
        }); 
   } 
 
   const order = await Order.create({ 
     userId: req.user.userId, 
     productId, 
     quantity, 
     status: "pending", 
   }); 
 
   res.status(201).json({ 
     message: "Commande créée avec succès", 
     order, 
     product, 
   }); 
 } catch (error) { 
   if (error.response) { 
     return res.status(error.response.status).json({ 
       message: error.response.data.message || "Erreur service produit", 
     }); 
   } 
 
   res.status(500).json({ message: error.message }); 
 } 
}; 
 
const getAllOrders = async (req, res) => { 
 try { 
   const orders = await Order.find(); 
   res.json(orders); 
 } catch (error) { 
   res.status(500).json({ message: error.message }); 
 } 
}; 
const getMyOrders = async (req, res) => { 
try { 
const orders = await Order.find({ userId: req.user.userId }); 
res.json(orders); 
} catch (error) { 
res.status(500).json({ message: error.message }); 
} 
}; 
module.exports = { 
createOrder, 
getAllOrders, 
getMyOrders, 
}; 