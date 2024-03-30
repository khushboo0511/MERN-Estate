const express = require('express');
const test = require('../controllers/user.controller');

const router = express.Router();

router.use(express.json());

router.get('/test', test)

module.exports = {userRouter: router}