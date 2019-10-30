import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { DateTime } from 'luxon';
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

  // Test cache for data
  let flights = FlightCache.getFlights(seed);

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

// flight
// Retrieve a flight for a given day
// filtered by flight number
app.get('/flight', (req, res) => {
  const dateFormatText = 'YYYY-MM-DD';
  const { query } = req;

  if (!query.date) {
    res.status(400).send(`'date' is a required parameter and must use the following format: ${dateFormatText}`);
    return;
  }

  if (!query.flightNumber) {
    res.status(400).send("'flightNumber' is a required parameter.");
    return;
  }
  const seed = DateTime.fromISO(query.date).toISODate();
  if (!seed) {
    res.status(400).send(`'date' value (${query.date}) is malformed; 'date' must use the following format: ${dateFormatText}`);
    return;
  }
  // Test cache for data
  let flights = FlightCache.getFlights(seed);

  // Filter results based on flightNumber
  if (query.flightNumber) {
    flights = flights.filter((flight) => flight.flightNumber === query.flightNumber);
  }

  // Respond with matching flights
  res.json(flights);
});

export default app;
