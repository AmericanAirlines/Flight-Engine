import express from 'express';
import bodyParser from 'body-parser';
import { DateTime } from 'luxon';
import Generator from './Generator';
import airports from './Data/airports';

const app = express();

// Inject middleware to parse JSON body objects
app.use(bodyParser.json());

// Inject middleware to parse URL-encoded form body objects
app.use(bodyParser.urlencoded({ extended: true }));

// Establish Routing
app.get('/', (_: express.Request, res: express.Response) => {
  res.send('👋');
});

// /flights
// Retrieve a list of flights for a given day
// filtered by origin and/or destination
app.get('/flights', (req, res) => {
  const seed = DateTime.utc().toISODate();
  const gen = new Generator(seed);
  const flights = [];

  for (let i = 0; i < 10; i += 1) {
    flights.push(gen.flight(airports[0], airports[1]));
  }

  res.json(flights);
});

export default app;
