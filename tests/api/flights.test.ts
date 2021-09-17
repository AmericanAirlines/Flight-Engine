import { flights } from '../../src/api/flights';
import { createTestApp, testHandler } from '../testUtils/testHandler';

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
});
