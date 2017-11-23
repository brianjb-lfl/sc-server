'use strict';

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const TaskSchema = mongoose.Schema({


});


TaskSchema.methods.apiRepr = function () {
  return {
  };
};

const Task = mongoose.models.Task || mongoose.model('Task', TaskSchema);

module.exports = { Task };

// { 
// id: 2,
// task: 'replace section of siding',
// address: '782 N Vincent St',
// csz: 'Hales Corners, WI 53292',
// assigned: null,
// complete: false,
// notes: '',
// },