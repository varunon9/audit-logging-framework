const mongoose = require('mongoose');//.set('debug', true);

const auditLogSchema = require('../schemas/auditLog');
const changeHistorySchema = require('../schemas/changeHistory');

module.exports = {
  AuditLog: mongoose.model('AuditLog', auditLogSchema),
  ChangeHistory: mongoose.model('ChangeHistory', changeHistorySchema)
};
