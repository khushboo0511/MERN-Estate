
const express = require('express');
const {sendMessage} =  require('../controllers/mail.controller.js')
const router = express.Router();

router.post('/send-message', sendMessage);

module.exports = router;
