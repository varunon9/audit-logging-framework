const express = require('express');
const router = express.Router();

const producerService = require('../kafka/producerService');

const logger = require('../modules/logger');
const { requireParameters } = require('../middlewares');

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
  res.json({
    success: true
  });
});

module.exports = router;