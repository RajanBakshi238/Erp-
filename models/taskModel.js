const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'A task must have a name'],
            trim: true,
            maxLength: [40, 'A task name must have less or equal then 40 characters'],
            minLength: [10, 'A task name must have less or equal then 10 characters']
        },
        assignedTo: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: [true, 'Task must belong to a user']
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }
    }
)

const Task = mongoose.model('Task', taskSchema)

module.exports = Task;