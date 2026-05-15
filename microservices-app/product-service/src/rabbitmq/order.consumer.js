const { getChannel } = require("../config/rabbitmq");
const mongoose = require("mongoose");
const Product = require("../models/product.model");

const consumeOrderCreatedEvents = async () => {
  const channel = getChannel();

  await channel.assertQueue(process.env.ORDER_QUEUE, {
    durable: true,
  });

  channel.prefetch(1);

  channel.consume(process.env.ORDER_QUEUE, async (msg) => {
    if (!msg) {
      return;
    }

    try {
      const order = JSON.parse(msg.content.toString());
      const productId = order.product_id;
      const quantity = Number(order.quantity);

      if (
        !mongoose.isValidObjectId(productId) ||
        !Number.isFinite(quantity) ||
        quantity <= 0
      ) {
        console.error("Invalid order event received:", order);
        channel.ack(msg);
        return;
      }

      const updatedProduct = await Product.findOneAndUpdate(
        {
          _id: productId,
          stock: { $gte: quantity },
        },
        {
          $inc: { stock: -quantity },
        },
        {
          new: true,
        }
      );

      if (!updatedProduct) {
        console.error(
          `Stock update skipped for product ${productId}: product not found or stock insufficient`
        );
        channel.ack(msg);
        return;
      }

      console.log(
        `Stock updated for product ${productId}. Remaining stock: ${updatedProduct.stock}`
      );

      channel.ack(msg);
    } catch (error) {
      console.error(
        "Failed to consume order created event:",
        error.message
      );
      channel.nack(msg, false, true);
    }
  });

  console.log("Waiting for order created events");
};

module.exports = {
  consumeOrderCreatedEvents,
};
