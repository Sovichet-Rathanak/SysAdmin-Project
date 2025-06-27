import express from 'express';
import dotenv from 'dotenv';
import taskRoute from './features/tasks/task.routes.js';
import connectDB from './config/db.config.js';
import columnRoute from './features/columns/column.routes.js';
import cors from 'cors';
dotenv.config();

const app = express();

// const whitelist = ["host.docker.internal:5173", 'http://localhost:5173']; 

// const corsOptions = { 
//     origin: (origin, callback) => { 
//         if (!origin || whitelist.includes(origin)) { 
//             callback(null, true); 
//         } else { 
//             callback(new Error("Not allowed by CORS")); 
//         } 
//     }, 
//     credentials: false, 
// };

// Middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Routes
app.use('/api/task', taskRoute);
app.use('/api/column', columnRoute);

// Connect with database
connectDB();

const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
    res.json({ mssg: 'Welcome to my Web Application Mission' });
});

app.listen(PORT, () => {
    console.log(`Server is successfully running and listening on port ${PORT}`);
});
