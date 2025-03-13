import express, { Application } from 'express';
import cors from 'cors';
import config from '../config/config';

import { router } from '@routes/index'

const app:Application = express();

app.use(express.json());

app.use(cors({
   origin: [config.frontEndUrl!]
}));

app.use(router)

export default app;
