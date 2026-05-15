const { getChannel } = require("../config/rabbitmq");

const publishOrderCreated = async (order) => {
  try {

    const channel = getChannel();

    await channel.assertQueue(process.env.ORDER_QUEUE, {
      durable: true
    });

    channel.sendToQueue(
      process.env.ORDER_QUEUE,
      Buffer.from(
        JSON.stringify({
          commande_id: order._id,
          product_id: order.productId,
          quantity: order.quantity
        })
      ),
      {
        persistent: true
      }
    );

    console.log("Order created event published");

  } catch (error) {
    console.error(
      "Failed to publish order created event:",
      error.message
    );
  }
};

module.exports = {
  publishOrderCreated
};