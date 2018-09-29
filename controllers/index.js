const auditLogService = require('../services');
const statusCode = require('../constants/statusCode');
const logger = require('../modules/logger');

module.exports = {
  createOrUpdate: async (params) => {
    try {
      const auditLog = await auditLogService.createOrUpdate(params);
      return [auditLog, statusCode.OK];
    } catch (error) {
      logger.error('controller createOrUpdate', error);
      throw ([
        'Server side error', statusCode.INTERNAL_SERVER_ERROR
      ]);
    }
  },

  get: async (params) => {
    try {
      const auditLog = await auditLogService.get(params);
      return [auditLog, statusCode.OK];
    } catch (error) {
      logger.error('controller get', error);
      throw ([
        'Server side error', statusCode.INTERNAL_SERVER_ERROR
      ]);
    }
  }
}