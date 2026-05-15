const Order = require("../models/order.model");

const {
  getProductByIdFromProductService,
} = require("../services/product.service");

const {
  publishOrderCreated,
} = require("../rabbitmq/order.producer");

const createOrder = async (req, res) => {
  try {

    const { productId, quantity } = req.body;

    // Validation
    if (!productId || !quantity) {
      return res.status(400).json({
        message: "productId et quantity sont obligatoires",
      });
    }

    if (Number(quantity) <= 0) {
      return res.status(400).json({
        message: "La quantité doit être supérieure à 0",
      });
    }

    // Get product from product service
    const product =
      await getProductByIdFromProductService(productId);

    if (!product) {
      return res.status(404).json({
        message: "Produit introuvable",
      });
    }

    // Stock check
    if (Number(quantity) > Number(product.stock)) {
      return res.status(400).json({
        message: "Stock insuffisant",
      });
    }

    // Create order
    const order = await Order.create({
      userId: req.user.userId,
      productId,
      quantity: Number(quantity),
      status: "pending",
    });

    // Publish event
    await publishOrderCreated(order);

    return res.status(201).json({
      success: true,
      message: "Commande créée avec succès",
      data: {
        order,
        product,
      },
    });

  } catch (error) {

    console.error(
      "Create order error:",
      error.message
    );

    // Axios / external service errors
    if (error.response) {

      return res.status(error.response.status).json({
        success: false,
        message:
          error.response.data.message ||
          "Erreur service produit",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Erreur interne du serveur",
    });
  }
};

const getAllOrders = async (req, res) => {
  try {

    const orders = await Order.find()
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });

  } catch (error) {

    console.error(
      "Get all orders error:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message: "Erreur interne du serveur",
    });
  }
};

const getMyOrders = async (req, res) => {
  try {

    const orders = await Order.find({
      userId: req.user.userId,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });

  } catch (error) {

    console.error(
      "Get my orders error:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message: "Erreur interne du serveur",
    });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getMyOrders,
};