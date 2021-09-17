import { aircraft } from '../../src/data/aircraft';

describe('Aircraft ', () => {
  it('At least one aircraft exists', () => {
    expect(aircraft.length).toBeGreaterThan(0);
  });
});
