import axios from "axios";
import type { Task } from "../type";

// const PORT = import.meta.env.VITE_PORT;

const API = axios.create({
    baseURL: `https://f903-203-189-152-116.ngrok-free.app/api`
})

//Create
export const createColumn = (columnTitle: string) =>
    API.post('/column', { columnTitle });
//Read
export const getAllColumns = () => API.get('/column')
//Update
export const updateColumn = (columnId: string, columnTitle: string) =>
    API.patch(`/column/${columnId}`, { columnTitle });
//Delete
export const deleteColumn = (columnId: string) =>
    API.delete(`/column/${columnId}`);


//Create
export const createTask = (data: {
    taskTitle: string;
    priority: 'low' | 'medium' | 'high';
    dueDate?: string;
    columnId: string;
}) => API.post('/task', data);
//Read
export const getTasksByColumn = (columnId: string) =>
    API.get(`/task/column/${columnId}`);
//Update
export const updateTask = (taskId: string, updates: Partial<Task>) =>
    API.patch(`/task/${taskId}`, updates);
//Delete
export const deleteTask = (taskId: string) =>
    API.delete(`/task/${taskId}`);