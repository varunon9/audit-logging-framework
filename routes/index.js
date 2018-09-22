const express = require('express');
const router = express.Router();

const { requireParameters } = require('../middlewares');
const auditLogController = require('../controllers');

router.get('/', (req, res ) => {
  res.json({
    success: true,
    message: 'Hello world'
  })
});

router.post('/auditLog', 
    requireParameters(['tableId', 'rowId']), (req, res) => {

  const params = req.body;
  auditLogController.createOrUpdate(params)
    .then(([auditLog, responseCode]) => { 
      res.status(responseCode);
      res.json({
        success: true,
        result: auditLog
      });
    }).catch(([err, responseCode]) => {
      res.status(responseCode);
      if (typeof(err) !== 'string') {
        console.error('routes /auditLog', err);
        err = 'Server side error';
      }
      res.json({
        success: false,
        message: err
      });
    });
});

module.exports = router;