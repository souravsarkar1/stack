const express = require('express');
const { connection } = require('./db');
const { userRoute } = require('./routes/user.routes');
const { questionRoute } = require('./routes/question.routes');
require('dotenv').config()
const app = express();

app.use(express.json());
app.use("/user",userRoute);
app.use("/question",questionRoute);
app.listen(process.env.port,async ()=>{
    try {
        await connection;
        console.log(`connected to db`);
        console.log(`Running at port no ${process.env.port}`);
    } catch (error) {
        console.log(`something went to wrong`);
    }
})