import express from 'express';
import cors from 'cors';
import log from './middlewares/log';
import apiRoutes from './app/api.routes';
import { notFoundHandler, errorHandler } from './app/error';
import { env } from './config/env';
import path from 'path';
import { deleteFiles } from './middlewares/deleteFiles';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(log);
app.use('/assets', express.static(path.join(process.cwd(), 'uploads')));
app.use(deleteFiles);

app.get('/', (_req, res) => {
  res.send('API is running...');
});

app.use(apiRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(env.port, () => {
  console.log(`Server is running on port ${env.port}`);
});
