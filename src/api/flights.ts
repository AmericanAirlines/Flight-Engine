import { Router } from 'express';
import { DateTime } from 'luxon';
import { airports } from '../data/airports';
import { flightCache } from '../FlightCache';
import { Generator } from '../Generator';
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
  const seed = isoDate.toISODate();

  if (!seed) {
    res.status(400).send(`'date' value (${query.date}) is malformed; 'date' must use the following format: ${dateFormatText}`);
    return;
  }

  const parsedFlightNumber = parseInt(flightNumber as string, 10);
  if (flightNumber && (!parsedFlightNumber || parsedFlightNumber < 0)) {
    res.status(400).send(`'flightNumber' must be an positive integer`);
    return;
  }

  const gen = new Generator(seed);
  let generatedFlights = [];

  // Test cache for data
  const cachedFlights = flightCache.getFlights(seed);
  if (!cachedFlights) {
    for (let i = 0; i < airports.length; i += 1) {
      // Iterate over all airports
      for (let j = airports.length - 1; j >= 0; j -= 1) {
        if (i !== j) {
          const originAirport = airports[i];
          const destinationAirport = airports[j];

          // For each O&D pair, create flights based on # per day
          const numFlights = gen.numFlightsForRoute();

          // 1am - 11pm (22 hours)
          const flightTimeOffset = 22 / numFlights;

          let time = isoDate.startOf('day').plus({ hours: 1 }).setZone(originAirport.timezone, { keepLocalTime: true });

          for (let k = 0; k <= numFlights; k += 1) {
            time = time.plus({ hours: flightTimeOffset, minutes: gen.random(-20, 20) });
            generatedFlights.push(gen.flight(originAirport, destinationAirport, time));
          }
        }
      }
    }
    // Cache flight data that was resulted in a cache miss
    flightCache.cacheFlights(seed, generatedFlights);
  } else {
    generatedFlights = cachedFlights;
  }

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
