import express from 'express';
import { createTask, getAllTask } from './task.controller.js';

const taskRoute = express.Router();

//Create new task
taskRoute.post('/', createTask);

//Get all task 
taskRoute.get('/', getAllTask);

//Delete task by id

//Get task by id

//Update task by id

export default taskRoute;