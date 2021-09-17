import { Router } from 'express';
import { DateTime } from 'luxon';
import airports from '../data/airports';
import FlightCache from '../FlightCache';
import Generator from '../Generator';
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

  const seed = date.toISODate();
  if (!seed) {
    res.status(400).send(`'date' value (${query.date}) is malformed; 'date' must use the following format: ${dateFormatText}`);
    return;
  }
  const gen = new Generator(seed);
  let generatedFlights = [];

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

          // 1am - 11pm (22 hours)
          const flightTimeOffset = 22 / numFlights;

          let time = date
            .startOf('day')
            .plus({ hours: 1 })
            .setZone(origin.timezone, { keepLocalTime: true });

          for (let k = 0; k <= numFlights; k += 1) {
            time = time.plus({ hours: flightTimeOffset, minutes: gen.random(-20, 20) });
            generatedFlights.push(gen.flight(origin, destination, time));
          }
        }
      }
    }
    // Cache flight data that was resulted in a cache miss
    FlightCache.cacheFlights(seed, generatedFlights);
  } else {
    generatedFlights = cachedFlights;
  }

  const {origin, destination } = query;

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