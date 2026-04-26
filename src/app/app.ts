import express from 'express';
import cors from 'cors';
import apiRoutes from './api.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use(apiRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

export default app;
