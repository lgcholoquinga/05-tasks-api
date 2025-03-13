import express, { Application } from 'express';
import routes from '@routes/task.routes';

const app:Application = express();

app.use(express.json());

app.use('/api/v1', routes())

export default app;
