const mongoose = require('mongoose');
const moment = require('moment');

const {millisecondsDiff} = require('./../utils/function')

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
        },
        startTime: {
            type: Date,
            default: null
        },
        endTime: {
            type: Date,
            default: null
        },
        pausedStartTime: {
            type: Date,
            default: null
        },
        pausedEndTime: {
            type: Date,
            default: null
        },
        status: {
            type: String,
            enum: ["pending", "running", "completed", "paused"],
            default: "pending"
        },
        activeHours: {
            type: Number,
            default: 0
        },
        
    }
)

taskSchema.pre('save', function (next){
    // console.log(this, "presave task model")
    if(!this.isNew){
        if(this.startTime && (this?.pausedStartTime || this?.endTime)){ // this will only run if startTime and pasued or endtime is there .
            if(this.startTime && this.pausedStartTime && !this.pausedEndTime && !this.endTime){
                // case for time pausing after task start
                //substract pausedStartTime - startTime and add it in activeHours
                this.activeHours = this.activeHours + millisecondsDiff(this.startTime, this.pausedStartTime)
            }
            if(this.pausedStartTime && this.pausedEndTime){
                // case for pause start again
                // substract pausedStartTime - pausedEndTime and add it in active hours
                this.activeHours = this.activeHours + millisecondsDiff(this.pausedEndTime, this.pausedStartTime)
                this.pausedEndTime = null
            }
            if(this.startTime && this.endTime){
                // case for ending the task
                // 3 - cases
                if(!this.pausedEndTime && !this.pausedStartTime){
                    // if paused functionality never used
                    //substract endTime - startTime and add it to active hours
                    this.activeHours = this.activeHours + millisecondsDiff(this.startTime, this.endTime)
                }
                if(this.pausedStartTime && !this.pausedEndTime){
                    // do nothing the time upto paused start is already in active hours
                }
                if(this.pausedEndTime && !this.pausedStartTime){
                    // paused end means user is working from paused end time
                    //substract endTime - pasuedEndTime and it to active hours
                    this.activeHours = this.activeHours + millisecondsDiff(this.pausedEndTime, this.endTime)
                }
                // here change the status
            }
        }
    }
    next();
})



const Task = mongoose.model('Task', taskSchema)

module.exports = Task;