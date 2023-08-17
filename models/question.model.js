const mongoose = require('mongoose');

const questionSchmema = mongoose.Schema({
    title : String,
    desc : String,
    language : String,
    date : String,
    userName : String,
    avater : String,
    questionID : String
},{
    versionKey: false,
    timestamps: true 
})

const QuestionModel = mongoose.model("question",questionSchmema);
module.exports = {QuestionModel};