import express from 'express';
import cors from 'cors';
import apiRoutes from './api.routes';
import { errorHandler, notFoundHandler } from './error';
import log from '../middlewares/log';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(log);

app.get('/', (_req, res) => {
  res.send('API is running...');
});

app.use(apiRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
