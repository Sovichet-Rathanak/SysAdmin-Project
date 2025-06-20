import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    taskTitle: {type: String, require: true},
    priority: {type: String, enum: ['low', 'medium', 'high']},
    dueDate: {type: Date},
    position: {type: Number}
})

export default mongoose.model('Task', taskSchema);