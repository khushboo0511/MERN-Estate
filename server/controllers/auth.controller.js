const express = require('express');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const {errorHandler} = require('../utils/error.js');

exports.signup = async (req, res, next) => {
    const {username, email, password} = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10)
    const newUser = new User({username, email, password: hashedPassword})

    try {
        await newUser.save()
        res.status(201).json("User created successfully!")
    } catch (error) {
        next(error)
    }
}