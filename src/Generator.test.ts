import 'jest';
import Generator from './Generator';
import airports from './Data/airports';

describe('Random seed generator ', () => {
  it('random method returns same values over time using the same seed', () => {
    const seed = '123';

    let generator1 = new Generator(seed);
    let values1 = new Array(10).fill(null).map(() => {
      return generator1.random(0, 100);
    });

    let generator2 = new Generator(seed);
    let values2 = new Array(10).fill(null).map(() => {
      return generator2.random(0, 100);
    });

    expect(values1).toEqual(values2);
  });

  it('random method returns diff values over time using unique seed', () => {
    const seed1 = '123';
    let generator1 = new Generator(seed1);
    let values1 = new Array(10).fill(null).map(() => {
      return generator1.random(0, 100);
    });

    const seed2 = '456';
    let generator2 = new Generator(seed2);
    let values2 = new Array(10).fill(null).map(() => {
      return generator2.random(0, 100);
    });

    expect(values1).not.toEqual(values2);
  });

  it('flights generated for a given route will always be the same ', () => {
    const seed = '2020-01-01';
    let origin = airports[0];
    let destination = airports[1];

    let generator1 = new Generator(seed);
    let values1 = new Array(10).fill(null).map(() => {
      return generator1.flight(origin, destination);
    });

    let generator2 = new Generator(seed);
    let values2 = new Array(10).fill(null).map(() => {
        return generator2.flight(origin, destination);
    });

    expect(values1).toEqual(values2);
  });

  it('the number of flights generated for a given route on a given day will always be the same ', () => {
    const seed = 'DFW-JFK';
    let origin = airports[0];
    let destination = airports[1];

    let generator1 = new Generator(seed);
    let values1 = new Array(10).fill(null).map(() => {
      return generator1.numFlightsForRoute();
    });

    let generator2 = new Generator(seed);
    let values2 = new Array(10).fill(null).map(() => {
        return generator2.numFlightsForRoute();
    });

    expect(values1).toEqual(values2);
  });
});
