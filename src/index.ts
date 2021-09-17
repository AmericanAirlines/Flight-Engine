/* istanbul ignore file */
import express from 'express';
import cors from 'cors';
import { env } from './env';
import logger from './logger';
import { flights } from './api/flights';

const port = env.port || '4000';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_: express.Request, res: express.Response) => {
  res.send('👋');
});

app.use('/flights', flights);

app.listen(port, () => {
  logger.notice(`🚀 Listening at http://localhost:${port}`);
});
