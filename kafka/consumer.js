const kafka = require('kafka-node');

const config = require('../config');

const client = new kafka.KafkaClient({
  kafkaHost: config.kafkaHost
});

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
  console.error('consumer', error);
});

consumer.on('message', (message) => {
  console.log('message', message);
  consumer.commit((error, data) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Commit success: ', data);
    }
  });
});
