import express  from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './database/db.js';
import Routes from './routes/userRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const app = express();
const port = process.env.PORT||5000;
dotenv.config();
connectDB();
app.use(express.json());
app.use(cors());

app.use("/user", Routes)
app.use("/chat", chatRoutes)
app.use(notFound);
app.use(errorHandler);


app.listen(port, ()=>{console.log(`Server is running at port ${port}`)});