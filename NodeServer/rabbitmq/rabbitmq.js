// rabbitmq.js
const amqp = require('amqplib/callback_api');

let channel = null;

const connectRabbitMQ = (url) => {
  return new Promise((resolve, reject) => {
    amqp.connect(url, (error0, connection) => {
      if (error0) {
        return reject(error0);
      }
      connection.createChannel((error1, ch) => {
        if (error1) {
          return reject(error1);
        }
        channel = ch;
        resolve();
      });
    });
  });
};

const sendMessage = (queue, msg) => {
  if (!channel) {
    throw new Error("RabbitMQ channel is not created. Please call connectRabbitMQ first.");
  }
  channel.assertQueue(queue, { durable: true });
  channel.sendToQueue(queue, Buffer.from(msg), { persistent: true });
};

const consumeMessage = (queue, callback) => {
  if (!channel) {
    throw new Error("RabbitMQ channel is not created. Please call connectRabbitMQ first.");
  }
  channel.assertQueue(queue, { durable: true });
  channel.consume(queue, callback, { noAck: true });
};

const getChannel = () => channel;

module.exports = { connectRabbitMQ, sendMessage, consumeMessage, getChannel };