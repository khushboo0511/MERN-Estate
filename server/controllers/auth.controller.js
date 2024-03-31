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

        const token = jwt.sign({ id: validUser._id }, 'ascnnvbivbiwegb5654946gerge44', { expiresIn: '15h' });
        const {password: pass, ...rest} = validUser._doc
        res.cookie('access-token', token, { httpOnly: true, secure: true, sameSite: 'strict' }).status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

exports.google = async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if (user) {
            const token = jwt.sign({id: user._id}, 'ascnnvbivbiwegb5654946gerge44')
            const {password: pass, ...rest} = user._doc;

            res
                .cookie('access_token', token, {httpOnly: true})
                .status(200)
                .json(rest)

        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
            const hashedPassword = bcrypt.hashSync(generatedPassword, 10)
            const newUser = new User({username: req.body.name.split(" ").join("").toLowerCase() + Math.random().
        toString(36).slice(-4), email: req.body.email, password: hashedPassword, avatar: req.body.photo })

        await newUser.save()
        const token = jwt.sign({id: user._id}, 'ascnnvbivbiwegb5654946gerge44')
            const {password: pass, ...rest} = user._doc;

            res
                .cookie('access_token', token, {httpOnly: true})
                .status(200)
                .json(rest)

        }
    } catch (error) {
        next(error)
    }
}