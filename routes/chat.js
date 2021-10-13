var express = require("express");
var router = express.Router();

// Create chat room page
router.get('/chatroom', (req, res) => res.render('chatroom'));
router.get('/chat', (req, res) => res.render('chat'));

module.exports = router;