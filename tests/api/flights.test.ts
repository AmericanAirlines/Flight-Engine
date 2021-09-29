import { flights } from '../../src/api/flights';
import { createTestApp, testHandler } from '../testUtils/testHandler';

jest.mock('../../src/services/generateFlightsByDate.ts', () => ({
  generateFlightsByDate: jest.fn().mockReturnValue([
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
    {
      flightNumber: '1234',
      origin: { code: 'DFW', city: 'Dallas-Fort Worth', timezone: 'America/Chicago', location: { latitude: 32.8998, longitude: 97.0403 } },
      destination: { code: 'PHL', city: 'Philadelphia', timezone: 'America/New_York', location: { latitude: 39.8729, longitude: -75.2437 } },
      distance: 7393,
      duration: { locale: '19h 3m', hours: 19, minutes: 3 },
      departureTime: '2020-01-01T03:46:40.000-05:00',
      arrivalTime: '2020-01-01T23:49:40.000-04:00',
      aircraft: { model: '738', passengerCapacity: { total: 160, main: 144, first: 16 }, speed: 400 },
    },
  ]),
}));

describe('flights', () => {
  it('returns an error when date is not provided ', async () => {
    await testHandler(flights).get('/').expect(400);
  });

  it('returns an error when date is malformed ', async () => {
    await testHandler(flights).get('/?date=junk').expect(400);
  });

  it('retrieves the same data when hit multiple times', async () => {
    const dateString = '2020-01-01';
    const testApp = createTestApp(flights);

    const { body: flights1 } = await testHandler(testApp).get(`/?date=${dateString}`).expect(200);
    expect(flights1.length).toBeGreaterThan(0);

    const { body: flights2 } = await testHandler(testApp).get(`/?date=${dateString}`).expect(200);
    expect(flights2).toEqual(flights1);
  });

  it('retrieves one flight when providing a date and flight number', async () => {
    const flightNumber = 4858; // Arbitrary flight number pulled from generated flight data
    const dateString = '2020-01-01';
    const testApp = createTestApp(flights);

    const { body: flights1 } = await testHandler(testApp).get(`/?flightNumber=${flightNumber}&date=${dateString}`).expect(200);
    expect(flights1.length).toEqual(1);
  });

  it('returns an empty list when one flight number does not exist', async () => {
    const flightNumber = 1; // Arbitrary flight number pulled from generated flight data
    const dateString = '2020-01-01';
    const testApp = createTestApp(flights);

    const { body: flights1 } = await testHandler(testApp).get(`/?flightNumber=${flightNumber}&date=${dateString}`).expect(200);
    expect(flights1.length).toEqual(0);
  });

  it('returns an empty list when one airport destination does not exist', async () => {
    const flightNumber = 1234; // Arbitrary flight number pulled from generated flight data
    const dateString = '2020-01-01';
    const airportCode = 'GSO';
    const testApp = createTestApp(flights);

    const { body: flights1 } = await testHandler(testApp)
      .get(`/?flightNumber=${flightNumber}&date=${dateString}&destination=${airportCode}`)
      .expect(200);
    expect(flights1.length).toEqual(0);
  });

  it('returns an empty list when one airport origin does not exist', async () => {
    const flightNumber = 1234; // Arbitrary flight number pulled from generated flight data
    const dateString = '2020-01-01';
    const airportCode = 'GSO';
    const testApp = createTestApp(flights);

    const { body: flights1 } = await testHandler(testApp).get(`/?flightNumber=${flightNumber}&date=${dateString}&origin=${airportCode}`).expect(200);
    expect(flights1.length).toEqual(0);
  });
});
