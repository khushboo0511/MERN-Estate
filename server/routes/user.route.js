const express = require('express');
const {test, updateUser} = require('../controllers/user.controller.js');
const { verifyToken } = require('../utils/verifyUser.js');

const router = express.Router();

router.use(express.json());

router.get('/test', test)

router.post('/update/:id', verifyToken, updateUser)

module.exports = {userRouter: router}