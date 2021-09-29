import 'jest';
import { DateTime } from 'luxon';
import { flightCache } from '../../src/FlightCache';
import { generateFlightsByDate } from '../../src/services/generateFlightsByDate';
import { getMock } from '../testUtils/getMock';

const mockFlights = [
  {
    flightNumber: '4858',
    origin: { code: 'DFW', city: 'Dallas-Fort Worth', timezone: 'America/Chicago', location: { latitude: 32.8998, longitude: 97.0403 } },
    destination: { code: 'PHL', city: 'Philadelphia', timezone: 'America/New_York', location: { latitude: 39.8729, longitude: -75.2437 } },
    distance: 7393,
    duration: { locale: '19h 3m', hours: 19, minutes: 3 },
    departureTime: '2020-01-01T03:46:40.000-05:00',
    arrivalTime: '2020-01-01T23:49:40.000-04:00',
    aircraft: { model: '738', passengerCapacity: { total: 160, main: 144, first: 16 }, speed: 400 },
  },
];
jest.mock('../../src/FlightCache.ts', () => ({
  flightCache: {
    getFlights: jest.fn().mockReturnValue(undefined),
    cacheFlights: jest.fn(),
  },
}));

describe('generateFlightsByDate ', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const dateString = '2021-01-01';
  const isoDate = DateTime.fromISO(dateString, { zone: 'utc' });

  it('should generate flights by seed', () => {
    const flights = generateFlightsByDate(isoDate);
    expect(flights.length).toBeGreaterThan(0);
  });

  it('should return flights from cache if there are flights', () => {
    getMock(flightCache.getFlights).mockReturnValueOnce(mockFlights);

    const flights = generateFlightsByDate(isoDate);
    expect(flights).toBe(mockFlights);
  });
});
