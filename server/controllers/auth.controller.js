const express = require('express');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const {errorHandler} = require('../utils/error.js');
const jwt = require('jsonwebtoken')

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
exports.signin = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        const validPassword = await bcrypt.compare(password, validUser.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Wrong credentials' });
        }

        const token = jwt.sign({ id: validUser._id }, 'ascnnvbivbiwegb5654946gerge44', { expiresIn: '1h' });
        const {password: pass, ...rest} = validUser._doc
        res.cookie('access-token', token, { httpOnly: true, secure: true, sameSite: 'strict' }).status(200).json(rest);
    } catch (error) {
        next(error);
    }
};