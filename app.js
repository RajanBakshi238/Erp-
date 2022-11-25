const express = require('express');
const morgan = require('morgan');

const taskRouter = require('./routes/taskRoutes')

const app = express();

app.use(express.json());

// DEVELOPMENT LOGGER
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use('/api/v1/tasks', taskRouter)


module.exports = app;