const express = require('express');
const router = express.Router();

const producerService = require('../kafka/producerService');

const logger = require('../modules/logger');
const { requireParameters } = require('../middlewares');
const auditLogController = require('../controllers');

router.get('/', (req, res ) => {
  res.json({
    success: true,
    message: 'audit log app is running.'
  })
});

router.post('/auditLog', 
    requireParameters(['tableId', 'rowId']), (req, res) => {

  const params = req.body;

  producerService.sendRecord(params, (error, data) => {
    if (error) {
      logger.error('producerService.sendRecord', error);
      res.json({
        success: false,
        message: error
      });
    } else {
      res.json({
        success: true,
        result: data
      });
    }
  });
});

router.get('/auditLog',
    requireParameters(['tableId', 'rowId']), (req, res) => {

  const params = req.query;
  auditLogController.get(params)
    .then(([auditLog, responseCode]) => { 
      res.status(responseCode);
      res.json({
        success: true,
        result: auditLog
      });
    }).catch(([err, responseCode]) => {
      res.status(responseCode);
      if (typeof(err) !== 'string') {
        console.error('routes get /auditLog', err);
        err = 'Server side error';
      }
      res.json({
        success: false,
        message: err
      });
    });
});

module.exports = router;