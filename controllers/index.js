const auditLogService = require('../services');
const statusCode = require('../constants/statusCode');

module.exports = {
  createOrUpdate: async (params) => {
    try {
      const auditLog = await auditLogService.createOrUpdate(params);
      return [auditLog, statusCode.OK];
    } catch (error) {
      console.error(error);
      throw ([
        'Server side error', statusCode.INTERNAL_SERVER_ERROR
      ]);
    }
  }
}