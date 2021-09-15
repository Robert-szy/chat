const express = require('express');
const router = express.Router();
const db = require('../client/db');

const messages = db.messages;

router.route('/messages').get((req, res) => {
  res.json(messages);
});


module.exports = router;
