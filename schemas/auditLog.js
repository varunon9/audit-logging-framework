// docs- https://mongoosejs.com/docs/guide.html

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const changeHistorySchema = require('./changeHistory');

const auditLogSchema = new Schema({
	tableId: {
		type: Number,
		required: true
	},
	rowId: {
		type: Number,
		required: true
	},
	changeHistory: {
		type: [changeHistorySchema] // default is empty array
	}
}, {
	timestamps: { createdAt: true, updatedAt: true }
});

auditLogSchema.index({ tableId: 1, rowId: 1 }); // schema level indexing

// add instance methods
//auditLogSchema.methods = {};

// add statics methods
//auditLogSchema.statics = {};

module.exports = auditLogSchema;