'use strict';
/* eslint no-console: "off" */

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const { Message } = require('./msg-models');

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

module.exports = { router };