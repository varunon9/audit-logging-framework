// docs- https://mongoosejs.com/docs/schematypes.html

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const changeHistorySchema = new Schema({
  date: {
    type: Date,
    required: true,
    default: new Date()
  },
  log: {
    type: Object
  },
  user: {
    type: Object
  },
  miscellaneous: {
    type: Object
  },
  ipAddress: {
    type: String
  }
});

// add instance methods
//changeHistorySchema.methods = {};

// add statics methods
//changeHistorySchema.statics = {};

module.exports = changeHistorySchema;