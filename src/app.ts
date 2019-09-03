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
  const { query } = req;
  const seed = DateTime.fromISO(query.date).toISODate();
  const gen = new Generator(seed);
  let flights = [];

  for (let i = 0; i < airports.length; i += 1) {
    // Iterate over all airports
    for (let j = airports.length - 1; j >= 0; j -= 1) {
      if (i !== j) {
        const origin = airports[i];
        const destination = airports[j];

        // For each O&D pair, create flights based on # per day
        const numFlights = gen.numFlightsForRoute();

        for (let k = 0; k <= numFlights; k += 1) {
          flights.push(gen.flight(origin, destination));
        }
      }
    }
  }

  if (query.origin) {
    flights = flights.filter((flight: Flight) => flight.origin.code === query.origin.toUpperCase());
  }

  if (query.destination) {
    flights = flights.filter((flight: Flight) => flight.destination.code === query.destination.toUpperCase());
  }

  res.json(flights);
});

export default app;
