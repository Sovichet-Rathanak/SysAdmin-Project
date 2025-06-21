import Task from './task.model.js';

//Create new task
export const createTask = async (req, res) => {
    try {
        const task = new Task(req.body);
        const savedTask = await task.save();
        res.status(201).json(savedTask);
    } catch (error) {
        console.log("Creating task failed: ", error);
        res.status(500).json({ error: error.message });
    }
}

//Get task by column
export const getAllTask = async (req, res) => {
    try {
        const columnId = req.params.columnId;

        if (!columnId) {
            return res.status(404).json({ message: 'Column not found' })
        }

        const tasks = await Task.find({ columnId });
        res.json(tasks);
    } catch (error) {
        console.log("Failed to fetch task: ", error);
        res.status(400).json({ error: error.message });
    }
}

//Update task by id
export const updateTaskById = async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.taskId,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' })
        }

        res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
    } catch (error) {
        console.log("Failed to update task: ", error);

        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }

        res.status(500).json({ error: error.message })
    }
}

//Delete task by id
export const deleteTaskById = async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.taskId)

        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: 'Task deleted successfully', task: deletedTask })
    } catch (error) {
        console.log('Failed to find task: ', error);
        res.status(500).json({ error: error.message })
    }
}