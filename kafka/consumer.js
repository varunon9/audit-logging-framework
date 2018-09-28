const kafka = require('kafka-node');

const config = require('../config');
const logger = require('../modules/logger');

const client = new kafka.KafkaClient({
  kafkaHost: config.kafkaHost
});

client.createTopics([{
  topic: config.kafkaTopic,
  partitions: 1,
  replicationFactor: 1
}], (error, result) => {
  if (error) {
    logger.error('client.createTopics', error);
  }

  const consumer = new kafka.Consumer(client, [
    {
      topic: config.kafkaTopic
    }
  ], {
    autoCommit: false
  });

  process.on('SIGINT', () => {
    consumer.close(true, () => { // true -> commit the current offset 
      process.exit();
    });
  });

  consumer.on('error', (error) => {
    logger.error('consumer error: ', error);
  });

  consumer.on('message', (message) => {
    logger.info('consumer message: ', message);
    consumer.commit((error, data) => {
      if (error) {
        logger.error('consumer.commit: ', error);
      } else {
        logger.info('Commit success: ', data);
      }
    });
  });
});
