import express from 'express';
import userRoutes from './routes/userRoutes';
import bookRoutes from './routes/bookRoutes';
import errorHandler from './middleware/errorHandler';


const app = express();

app.use(express.json()); // middleware to parse incoming requests with JSON payloads

app.use('/users', userRoutes);
app.use('/books', bookRoutes);
app.use(errorHandler);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

export default app;
