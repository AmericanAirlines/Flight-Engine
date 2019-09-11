import seedrandom from 'seedrandom';
import haversine from 'haversine-distance';
import aircraft from './Data/aircraft';

const createRandomGenerator = (seed: string): (() => number) => {
  if (seed === undefined || seed === null) {
    // With a null seed, this method will no longer be deterministic, which is not intended
    throw new Error('Seed cannont be null as it causes unexpected behavior');
  }
  // Create a method which returns a random number between 'min' and 'max'
  const random = seedrandom(seed);
  return (min = 0, max = 0): number => {
    const r = random();
    return Math.floor(r * (max - min + 1) + min);
  };
};

// Determine miles value for distance between two locations (lat/lon)
const calcDistance = (a: Location, b: Location): number => Math.round(haversine(a, b) / 1609.344);

export default class Generator {
  random: (min?: number, max?: number) => number;

  constructor(seed: string) {
    // Generate the random method with the given seed
    // Calls to this method will return a random value, however,
    // generating a new this.random with the same seed will
    // yield the same results for the nth and n+1th calls
    // (i.e., results from f(x) = 5, 7, 4, 1 and results from
    // g(x) using the same seed = 5, 7, 4, 1
    this.random = createRandomGenerator(seed);
  }

  // Determine the number of flights for a given route for a specific day
  numFlightsForRoute(): number {
    // Use those values to create a hash and use that value as the seed
    // to create a new random method to be used for numFlights
    return this.random(5, 15);
  }

  // Randomly generate a flight for the given origin and destination
  flight(origin: Airport, destination: Airport): Flight {
    // Generate a random flight number
    const flightNumber: string = this.random(1, 9999)
      .toFixed(0)
      .padStart(4, '0');

    // Calculate distance of route based on lat/lon
    const distance = calcDistance(origin.location, destination.location);

    // Assign random aircraft
    const randAircraft = aircraft[this.random(0, aircraft.length - 1)];

    // Determine flight duration based on distance and aircraft speed
    const duration: FlightDuration = {
      locale: '',
      hours: (distance / randAircraft.speed) * (this.random(1000, 1100) / 1000),
      minutes: 0,
    };
    duration.minutes = Math.floor(60 * (duration.hours - Math.floor(duration.hours)));
    duration.hours = Math.floor(duration.hours);
    duration.locale = `${duration.hours}h ${duration.minutes}m`;

    return {
      flightNumber,
      origin,
      destination,
      distance,
      duration,
      aircraft: randAircraft,
    };
  }
}
