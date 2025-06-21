import express from 'express';
import { createTask, deleteTaskById, getAllTask, updateTaskById } from './task.controller.js';

const taskRoute = express.Router();

//Create new task
taskRoute.post('/', createTask);

//Get all task 
taskRoute.get('/:columnId', getAllTask);

//Update task by id
taskRoute.patch('/:taskId', updateTaskById);

//Delete task by id
taskRoute.delete('/:taskId', deleteTaskById);

export default taskRoute;