import dotenv from 'dotenv';
import app from './app';
import logger from './logger';

dotenv.config();

const environment = process.env.NODE_ENV || 'development';
const port = process.env.PORT || '3030';

// Start the app
app.listen(port, () => {
  logger.notice(`Running in the ${environment} environment on port ${port}`);
});
