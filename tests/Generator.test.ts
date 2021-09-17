import 'jest';
import { DateTime } from 'luxon';
import { Generator } from '../src/Generator';
import { airports } from '../src/data/airports';

describe('Random seed generator ', () => {
  it('random method returns same values over time using the same seed', () => {
    const seed = '123';

    const generator1 = new Generator(seed);
    const values1 = new Array(10).fill(null).map(() => generator1.random(0, 100));

    const generator2 = new Generator(seed);
    const values2 = new Array(10).fill(null).map(() => generator2.random(0, 100));

    expect(values1).toEqual(values2);
  });

  it('random method returns diff values over time using unique seed', () => {
    const seed1 = '123';
    const generator1 = new Generator(seed1);
    const values1 = new Array(10).fill(null).map(() => generator1.random(0, 100));

    const seed2 = '456';
    const generator2 = new Generator(seed2);
    const values2 = new Array(10).fill(null).map(() => generator2.random(0, 100));

    expect(values1).not.toEqual(values2);
  });

  it('flights generated for a given route will always be the same ', () => {
    const seed = '2020-01-01';
    const origin = airports[0];
    const destination = airports[1];
    const departureTime = DateTime.utc();

    const generator1 = new Generator(seed);
    const values1 = new Array(10).fill(null).map(() => generator1.flight(origin, destination, departureTime));

    const generator2 = new Generator(seed);
    const values2 = new Array(10).fill(null).map(() => generator2.flight(origin, destination, departureTime));

    expect(values1).toEqual(values2);
  });

  it('the number of flights generated for on a given day will always be the same ', () => {
    const seed = 'DFW-JFK';

    const generator1 = new Generator(seed);
    const values1 = new Array(10).fill(null).map(() => generator1.numFlightsForRoute());

    const generator2 = new Generator(seed);
    const values2 = new Array(10).fill(null).map(() => generator2.numFlightsForRoute());

    expect(values1).toEqual(values2);
  });
});
