import { DateTime } from 'luxon';
import { airports } from '../data/airports';
import { flightCache } from '../FlightCache';
import { Generator } from '../Generator';
import { Flight } from '../types';

export function generateFlightsByDate(date: DateTime): Flight[] {
  const seed = date.toISODate();
  const gen = new Generator(seed);
  let generatedFlights = [];

  // Test cache for data
  const cachedFlights = flightCache.getFlights(seed);
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

          let time = date.startOf('day').plus({ hours: 1 }).setZone(origin.timezone, { keepLocalTime: true });

          for (let k = 0; k <= numFlights; k += 1) {
            time = time.plus({ hours: flightTimeOffset, minutes: gen.random(-20, 20) });
            generatedFlights.push(gen.flight(origin, destination, time));
          }
        }
      }
    }
    // Cache flight data that was resulted in a cache miss
    flightCache.cacheFlights(seed, generatedFlights);
  } else {
    generatedFlights = cachedFlights;
  }

  return generatedFlights;
}
