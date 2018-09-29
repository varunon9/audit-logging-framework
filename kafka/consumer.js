const kafka = require('kafka-node');

const config = require('../config');
const logger = require('../modules/logger');
const utility = require('./utility');
const auditLogController = require('../controllers');

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
  logger.error('consumer error: ', error);
});

consumer.on('message', (message) => {
  logger.debug('consumer message: ', message);
  
  // processing data
  const params = JSON.parse(message.value);

  const auditLog = {
    tableId: params.tableId,
    rowId: params.rowId,
    changeHistory: {}
  };

  if (params.ipAddress) {
    auditLog.changeHistory.ipAddress = params.ipAddress;
  }

  if (params.user) {
    auditLog.changeHistory.user = params.user;
  }

  if (params.miscellaneous) {
    auditLog.changeHistory.miscellaneous = params.miscellaneous;
  }

  auditLog.changeHistory.log = 
     utility.calculateDiff(params.oldData, params.newData);

  auditLogController.createOrUpdate(auditLog)
    .then(([auditLog, responseCode]) => { 
      logger.debug('saved log', auditLog);

      consumer.commit((error, data) => {
        if (error) {
          logger.error('consumer.commit: ', error);
        } else {
          logger.debug('commit success: ', data);
        }
      });
    }).catch(([err, responseCode]) => {
      if (typeof(err) !== 'string') {
        logger.error('consumer auditLogController.createOrUpdate', err);
      }
    });
});
