const express = require('express');
const router = express.Router();

// Landing Page
router.get('/', (req, res) => res.render('landing'));
router.get('/contact', (req, res) => res.render('contact'));

module.exports = router;
