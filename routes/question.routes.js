const express = require('express');
const { auth } = require('../middleware/auth');
const { QuestionModel } = require('../models/question.model');

const questionRoute = express.Router();

questionRoute.post('/add', auth, async (req, res) => {
    try {
        const { title, desc, language, date } = req.body;

        if (!title || !desc || !language || !date) {
            return res.status(401).json({ msg: "Please Fill All the required Field" });
        }
        const question = new QuestionModel(req.body);
        await question.save();
        res.status(200).json({ msg: `new question is added` });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

questionRoute.get('/', async (req, res) => {
    try {
        const data = await QuestionModel.find();
        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

questionRoute.get('/mydata', auth, async (req, res) => {
    try {
        const data = await QuestionModel.find({ userID: req.body.userID });
        return res.json({ data });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

module.exports = { questionRoute };