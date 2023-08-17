const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
const { registerCheck } = require('../middleware/register.check');
var jwt = require('jsonwebtoken');
const { UserModel } = require('../models/user.model');
const userRoute = express.Router();
// register
userRoute.post('/register', registerCheck, async (req, res) => {
    try {
        const { name, email, pass, avater } = req.body;
        // const existingUser = users.find((user) => user.email === email);
        const existingUser = await UserModel.findOne({ email });
        const existingUserName = await UserModel.findOne({ name });
        if (existingUser) {
            return res.status(400).json({ error: 'A user with the same email already exists' });
        }
        else if (existingUserName) {
            return res.status(400).json({ error: 'A user with the same userName already exists' });
        }
        else {
            bcrypt.hash(pass, 5, async (err, hash) => {
                // Store hash in your password DB.
                if (err) {
                    res.send(400).json({ err: err.message });
                }
                else {
                    const user = new UserModel({ name, email, pass: hash, avater });
                    await user.save();
                    res.status(200).json({ msg: 'New user has been updated', updatedUser: req.body });
                }
            });
        }


    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})


// login
userRoute.post('/login', async (req, res) => {
    const { pass, email } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: 'User not found.' });
        }
        bcrypt.compare(pass, user.pass, (err, result) => {
            // result == true
            const token = jwt.sign({ name: user.name, avater: user.avater, userID: user._id }, 'masai', {
                expiresIn: '7d'
            });
            if (result) {
                res.status(200).json({ msg: "Login Successful!!", token: token, name: user.name, avater: user.avater });
            }
            else {
                res.status(200).json({ msg: "Wrong Crendintial" });
            }
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})





module.exports = { userRoute };