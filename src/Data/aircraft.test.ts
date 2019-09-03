import airports from './aircraft';

describe('Aircraft ', () => {
  it('At least one aircraft exists', () => {
    expect(airports.length).toBeGreaterThan(0);
  });
});
