import express from 'express';
import dotenv from 'dotenv';
import taskRoute from './features/tasks/task.routes.js';
import connectDB from './config/db.config.js';
dotenv.config();

const app = express();

//Middleware
app.use(express.json());
app.use((req, res, next)=>{
    console.log(req.path, req.method)
    next()
});

//Routes
app.use('/api/task', taskRoute);

//Connect with database
connectDB()

const PORT = process.env.PORT;
app.get('/', (req, res)=>{
    res.json({mssg: 'Welcome to my Web Application Mission'})
})

app.listen(PORT, () => {
    console.log(`Server is successfully running and listening on port ${PORT}`);
});