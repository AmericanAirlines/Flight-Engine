import { airportRouter } from '../../src/api/airports';
import { createTestApp, testHandler } from '../testUtils/testHandler';

describe('airports', () => {
  it('returns an error when date is not provided ', async () => {
    await testHandler(airportRouter).get('/').expect(400);
  });

  it('returns an error when date is malformed ', async () => {
    await testHandler(airportRouter).get('/?code=junk').expect(400);
  });

  it('retrieves the same data when hit multiple times', async () => {
    const airportCode = 'GSO';
    const testApp = createTestApp(airportRouter);

    const { body: airport1 } = await testHandler(testApp).get(`/?code=${airportCode}`).expect(200);
    expect(airport1.length).not.toBeNull();

    const { body: airport2 } = await testHandler(testApp).get(`/?code=${airportCode}`).expect(200);
    expect(airport2).toEqual(airport1);
  });

  it('returns a 404 status code when no airport is found', async () => {
    const airportCode = 'AAA';
    const testApp = createTestApp(airportRouter);

    const { body: airport } = await testHandler(testApp).get(`/?code=${airportCode}`).expect(404);
    expect(airport).toEqual({});
  });
});
