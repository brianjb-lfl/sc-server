'use strict';

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const MessageSchema = mongoose.Schema({
  msg: {
    type: String,
    required: true
  },
  sender: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

MessageSchema.methods.apiRepr = function () {
  return {
    id: this._id,
    msg: this.msg,
    sender: this.sender,
    timestamp: this.timestamp
  };
};

const Message = mongoose.models.Message || mongoose.model('Message', MessageSchema);

module.exports = { Message };

