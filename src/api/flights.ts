import { Router } from 'express';
import { DateTime } from 'luxon';
import { generateFlightsByDate } from '../services/generateFlightsByDate';
import { Flight } from '../types';

export const flights = Router();

flights.get('/', (req, res) => {
  const dateFormatText = 'YYYY-MM-DD';
  const { query } = req;
  if (!query || typeof query.date !== 'string') {
    res.status(400).send(`'date' is a required parameter and must use the following format: ${dateFormatText}`);
    return;
  }

  const { date, flightNumber, origin, destination } = query;
  const isoDate = DateTime.fromISO(date, { zone: 'utc' });

  if (!isoDate.isValid) {
    res.status(400).send(`'date' value (${query.date}) is malformed; 'date' must use the following format: ${dateFormatText}`);
    return;
  }

  let generatedFlights = generateFlightsByDate(isoDate);

  // Filter results based on origin
  if (typeof origin === 'string') {
    generatedFlights = generatedFlights.filter((flight: Flight) => flight.origin.code === origin.toUpperCase());
  }

  // Filter results based on destination
  if (typeof destination === 'string') {
    generatedFlights = generatedFlights.filter((flight: Flight) => flight.destination.code === destination.toUpperCase());
  }

  // Filter results based on flight number
  if (flightNumber) {
    generatedFlights = generatedFlights.filter((flight) => flight.flightNumber === flightNumber);
  }

  // Respond with matching flights
  res.json(generatedFlights);
});
