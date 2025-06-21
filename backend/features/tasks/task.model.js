import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    taskTitle: {
        type: String, 
        required: true,
        uppercase: true
    },
    priority: {
        type: String, 
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    dueDate: {type: Date},
    columnId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Column',
        required: true
    }    
})

export default mongoose.model('Task', taskSchema);