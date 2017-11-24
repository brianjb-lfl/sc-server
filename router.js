'use strict';
/* eslint no-console: "off" */

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const { Message } = require('./msg-model');
const { Task } = require('./task-model');

// ***** MESSAGES

router.get('/messages/:id', (req, res) => {
  Message
  .find({taskid: req.params.id})
  .sort([['timestamp', 'descending']])
  .then( messages => {
    let newArr = messages.map( message => message.apiRepr());
    res.json(newArr);
  })
  .catch( err => {
    console.error(err);
    res.status(500).json({error: 'Search failed'});
  });
});

router.get('/messages', (req, res) => {
  Message
  .find()
  .sort([['timestamp', 'descending']])
  .then( messages => {
    let newArr = messages.map( message => message.apiRepr());
    res.json(newArr);
  })
  .catch( err => {
    console.error(err);
    res.status(500).json({error: 'Search failed'});
  });
});

router.post('/messages', jsonParser, (req, res) => {
  const reqFs = ['msg', 'sender'];
  const missingF = reqFs.find( field => !(field in req.body));
  if(missingF) {
    return res.status(422).json('missing field');
  }
  let { msg, sender } = req.body;
  return Message.create({msg, sender})
    .then( message => res.status(201).json(message.apiRepr()))
    .catch( err => {
      res.status(500).json({message: 'Internal server error'});
    });
});

router.delete('/messages/:id', (req, res) => {
  Message
  .findByIdAndRemove(req.params.id)
  .then( () => {
    res.status(204).end();
  })
  .catch( err => {
    res.status(500).json({message: 'Internal server error'});
  });
});


// ***** TASKS

router.get('/tasks/:user', (req, res) => {
  console.log('getting tasks', req.params.user);
  Task
  .find({assigned: req.params.user})
  .sort([['timestamp', 'ascending']])
  .then( tasks => {
    let newArr = tasks.map( task => task.apiRepr());
    res.json(newArr);
  })
  .catch( err => {
    console.error(err);
    res.status(500).json({error: 'Search failed'});
  });
});

router.get('/tasks', (req, res) => {
  Task
  .find()
  .sort([['timestamp', 'ascending']])
  .then( tasks => {
    let newArr = tasks.map( task => task.apiRepr());
    res.json(newArr);
  })
  .catch( err => {
    console.error(err);
    res.status(500).json({error: 'Search failed'});
  });
});

router.post('/tasks', jsonParser, (req, res) => {
  const reqFs = ['task', 'contact', 'address', 'csz'];
  const missingF = reqFs.find( field => !(field in req.body));
  if(missingF) {
    return res.status(422).json('missing field');
  }
  const assigned = 'assigned' in req.body ? req.body.assigned : null;
  let { task, contact, address, csz } = req.body;
  return Task.create({task, contact, address, csz, assigned})
    .then( task => res.status(201).json(task.apiRepr()))
    .catch( err => {
      res.status(500).json({message: 'Internal server error'});
    });
});

router.put('/tasks/:id', jsonParser, (req, res) => {
  const reqFs = ['task', 'contact', 'address', 'csz'];
  const missingF = reqFs.find( field => !(field in req.body));
  if(missingF) {
    return res.status(422).json('missing field');
  }
  return Task.findByIdAndUpdate(req.params.id, {$set:req.body}, {new:true})
    .then( data => res.status(201).json({data}))
    .catch( err => {
      res.status(500).json({message: 'Internal server error'});
    });
});

router.delete('/tasks/:id', (req, res) => {
  Task
  .findByIdAndRemove(req.params.id)
  .then( () => res.status(204).end())
  .catch( err => {
    res.status(500).json({message: 'Internal server error'});
  });
});

module.exports = { router };