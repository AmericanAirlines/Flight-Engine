import airports from './airports';

describe('Airports /', () => {
  it('At least two airports exist', () => {
    expect(airports.length).toBeGreaterThan(1);
  });
});
