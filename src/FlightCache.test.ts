import 'jest';
import Generator from './Generator';
import airports from './Data/airports';
import FlightCache from './FlightCache';
import { JestEnvironment } from '@jest/environment';

describe('FlightCache ', () => {
  const sampleDate = '2020-01=01';
  const origin = airports[0];
  const destination = airports[1];

  beforeEach(() => {
    jest.resetModules();
  });

  it('should return null for a cache miss', () => {
    const flights = FlightCache.getFlights(sampleDate);
    expect(flights).toEqual(null);
  });

  it('should return flights for a cache hit on date', () => {
    const numFlights = 10;
    const generator = new Generator(sampleDate);
    const flights = Array(numFlights).fill(null).map(() => {
      return generator.flight(origin, destination);
    });
    FlightCache.cacheFlights(sampleDate, flights);
    const cachedFlights = FlightCache.getFlights(sampleDate);
    expect(cachedFlights).toEqual(flights);
    expect(cachedFlights.length).toEqual(numFlights);
  });
});
