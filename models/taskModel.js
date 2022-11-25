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
        createdAt: {
            type: Date,
            default: Date.now,
        }
    }
)

const Task = mongoose.model('Task', taskSchema)

module.exports = Task;