'use strict';

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const TaskSchema = mongoose.Schema({
  task: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  csz: {
    type: String,
    required: true
  },
  assigned: {
    type: String,
    default: null
  },
  complete: {
    type: Boolean,
    default: false
  },
  notes: {
    type: String
  },
  timestamp: {
    type: Date,
    default: Date.now
  }

});

TaskSchema.virtual('fullAddress')
.get(function() {
  return `${this.address} - ${this.csz}`;
});

TaskSchema.methods.apiRepr = function () {
  return {
    id: this._id,
    task: this.task,
    contact: this.contact,
    addr: this.fullAddress,
    assigned: this.assigned,
    complete: this.complete,
    notes: this.notes,
    timestamp: this.timestamp
  };
};

const Task = mongoose.models.Task || mongoose.model('Task', TaskSchema);

module.exports = { Task };
