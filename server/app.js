const express = require('express');
const morgan = require('morgan');
const cookieParser = require("cookie-parser");

const taskRouter = require('./routes/taskRoutes')
const userRouter = require('./routes/userRoutes')
const attendanceRouter = require('./routes/attendanceRoutes')


const app = express();

app.use(express.json());
app.use(cookieParser());

// DEVELOPMENT LOGGER
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use('/api/v1/tasks', taskRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/attendance', attendanceRouter)


module.exports = app;