import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { DateTime } from 'luxon';
import Generator from './Generator';
import airports from './Data/airports';
import FlightCache from './FlightCache';

const app = express();

// Enable cross origin requests
app.use(cors());

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
  const dateFormatText = 'YYYY-MM-DD';
  const { query } = req;
  if (!query || !query.date) {
    res.status(400).send(`'date' is a required parameter and must use the following format: ${dateFormatText}`);
    return;
  }
  const seed = DateTime.fromISO(query.date).toISODate();
  if (!seed) {
    res.status(400).send(`'date' value (${query.date}) is malformed; 'date' must use the following format: ${dateFormatText}`);
    return;
  }
  const gen = new Generator(seed);
  let flights = [];

  // Test cache for data
  const cachedFlights = FlightCache.getFlights(seed);
  if (!cachedFlights) {
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
    // Cache flight data that was resulted in a cache miss
    FlightCache.cacheFlights(seed, flights);
  } else {
    flights = cachedFlights;
  }

  // Filter results based on origin
  if (query.origin) {
    flights = flights.filter((flight: Flight) => flight.origin.code === query.origin.toUpperCase());
  }

  // Filter results based on destination
  if (query.destination) {
    flights = flights.filter((flight: Flight) => flight.destination.code === query.destination.toUpperCase());
  }

  // Respond with matching flights
  res.json(flights);
});

export default app;
