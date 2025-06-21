import express from "express";
import { createColumn, deleteColumnById, getAllColumn, updateColumnById } from "./column.controller.js";

const columnRoute = express.Router();

//Create new column
columnRoute.post('/', createColumn);

//Get all columns
columnRoute.get('/', getAllColumn);

//Update column by id
columnRoute.patch('/:columnId', updateColumnById);

//Delete column by id
columnRoute.delete('/:columnId', deleteColumnById);

export default columnRoute;