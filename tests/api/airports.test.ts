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
});
