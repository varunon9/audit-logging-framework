// docs- https://mongoosejs.com/docs/guide.html
// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose

const models = require('../models');

module.exports = {

  createOrUpdate: async (params) => {
    try {
      const auditLog = await models.AuditLog.findOneAndUpdate({
        tableId: params.tableId,
        rowId: params.rowId
      }, {
        $push: {
          changeHistory: params.changeHistory
        }
      }, {
        upsert: true, // create if doesn't exist
        new: true // return the modified document
      }).exec();

      return auditLog;
    } catch (error) {
      throw error;
    }
  },

  get: async (params) => {
    try {
      const auditLog = await models.AuditLog.findOne({
        tableId: params.tableId,
        rowId: params.rowId
      }, {
        changeHistory: {
          $slice: params.count ? parseInt(params.count) : 5 // by default top 5 change logs will be fetched
        }
      }).exec();

      return auditLog;
    } catch (error) {
      throw error;
    }
  }
};
