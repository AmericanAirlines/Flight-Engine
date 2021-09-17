import 'jest';
import { DateTime } from 'luxon';
import { Generator } from '../src/Generator';
import { airports } from '../src/data/airports';
import { flightCache } from '../src/FlightCache';

describe('FlightCache ', () => {
  const sampleDate = '2020-01=01';
  const origin = airports[0];
  const destination = airports[1];

  beforeEach(() => {
    jest.resetModules();
  });

  it('should return null for a cache miss', () => {
    const flights = flightCache.getFlights(sampleDate);
    expect(flights).toEqual(null);
  });

  it('should return flights for a cache hit on date', () => {
    const numFlights = 10;
    const generator = new Generator(sampleDate);
    const departureTime = DateTime.utc();

    const flights = Array(numFlights)
      .fill(null)
      .map(() => generator.flight(origin, destination, departureTime));

    flightCache.cacheFlights(sampleDate, flights);
    const cachedFlights = flightCache.getFlights(sampleDate);
    expect(cachedFlights).toEqual(flights);
    expect(cachedFlights.length).toEqual(numFlights);
  });
});
