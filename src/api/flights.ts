import { Router } from 'express';
import { DateTime } from 'luxon';
import { generateFlightsBySeed } from '../services/generateFlightsBySeed';
import { Flight } from '../types';

export const flights = Router();

flights.get('/', (req, res) => {
  const dateFormatText = 'YYYY-MM-DD';
  const { query } = req;
  if (!query || typeof query.date !== 'string') {
    res.status(400).send(`'date' is a required parameter and must use the following format: ${dateFormatText}`);
    return;
  }

  const date = DateTime.fromISO(query.date, { zone: 'utc' });

  const validDate = date.isValid;
  if (!validDate) {
    res.status(400).send(`'date' value (${query.date}) is malformed; 'date' must use the following format: ${dateFormatText}`);
    return;
  }

  let generatedFlights = generateFlightsBySeed(date);

  const { origin, destination } = query;

  // Filter results based on origin
  if (typeof origin === 'string') {
    generatedFlights = generatedFlights.filter((flight: Flight) => flight.origin.code === origin.toUpperCase());
  }

  // Filter results based on destination
  if (typeof destination === 'string') {
    generatedFlights = generatedFlights.filter((flight: Flight) => flight.destination.code === destination.toUpperCase());
  }

  // Respond with matching flights
  res.json(generatedFlights);
});
