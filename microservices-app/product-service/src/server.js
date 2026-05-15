require("dotenv").config();

const app = require("./app");
const connectDb = require("./config/db");
const connectRabbitMQ = require("./config/rabbitmq").connectRabbitMQ;
const {
  consumeOrderCreatedEvents,
} = require("./rabbitmq/order.consumer");

const PORT = process.env.PORT || 5001;

const startServer = async () => {
  await connectDb();
  await connectRabbitMQ();
  await consumeOrderCreatedEvents();

  app.listen(PORT, () => {
    console.log(`Product service running on port ${PORT}`);
  });
};

startServer();
