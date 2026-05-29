import express from 'express';
import userRouter from './router/user.router.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { DEVELOPMENT_MODE, FRONTENDURL } from './envHelper.js';

const app = express();
const bcd = 'https://preview-new.playcode.io'
const local1 = 'http://localhost:3001/'
const local2 = 'http://localhost:3000'

app.use(cors({
    origin: [...FRONTENDURL, bcd, local1, local2],
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));


app.use(cookieParser());
app.use(express.json());

app.use('/health', (req, res) => {
    res.status(200).json({ status: 'success' });
})

app.use('/api/health', (req, res) => {
    res.status(200).json({ status: 'success' });
})
app.use('/api', userRouter);


export default app;
