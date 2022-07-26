const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./config/db');
const userRouter = require('./routes/login');
const classRouter = require('./routes/class');
const announcementRouter = require('./routes/announcement');
const quizRouter = require('./routes/quiz');
const assignmentRouter = require('./routes/assignment');


connectDB();

app.use(express.json());

app.use('/api/login',userRouter);
app.use('/api/class',classRouter);
app.use('/api/quiz',quizRouter);
app.use('/api/assignment',assignmentRouter);
app.use('/api/announcement',announcementRouter);

app.listen(process.env.PORT || 5000,()=>{
    console.log("Backend running");
});