import Task from './task.model.js';

//Create new task
export const createTask = async (req, res) => {
    try {
        const task = new Task(req.body);
        const savedTask = await task.save();
        res.status(201).json(savedTask);
    } catch (error) {
        console.log("Creating task failed: ", error);
        res.status(400).json({ error: error.message });
    }
}

//Get all task
export const getAllTask = async (req, res) => {
    try{
        const tasks = await Task.find().sort('position');
        res.json(tasks);
    }catch(error){
        console.log("Failed to fetch task: ", error);
        res.status(400).json({error: error.message});
    }
}