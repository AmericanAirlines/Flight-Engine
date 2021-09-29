import 'jest';
import { DateTime } from 'luxon';
import { generateFlightsByDate } from '../../src/services/generateFlightsByDate';

describe('generateFlightsByDate ', () => {
  const dateString = '2021-01-01';
  const isoDate = DateTime.fromISO(dateString, { zone: 'utc' });

  it('should generate flights by seed', () => {
    const flights = generateFlightsByDate(isoDate);
    expect(flights.length).toBeGreaterThan(0);
  });

  it('should return flights from cache when same date is used', () => {
    const flights1 = generateFlightsByDate(isoDate);
    expect(flights1.length).toBeGreaterThan(0);
    // expect(cacheFlightsMock).toHaveBeenCalledWith(........);

    const flights2 = generateFlightsByDate(isoDate);
    expect(flights2.length).toBeGreaterThan(0);

    expect(flights1).toEqual(flights2);
    // expect(cacheFlightsMock).toHaveBeenCalledTimes(1);
  });
});
