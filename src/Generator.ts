import seedrandom from 'seedrandom';
import haversine from 'haversine-distance';
import { DateTime } from 'luxon';
import { aircraft } from './data/aircraft';
import { Airport, Flight, FlightDuration, Location } from './types';

const createRandomGenerator = (seed: string): ((min: number, max: number) => number) => {
  // Create a method which returns a random number between 'min' and 'max'
  const random = seedrandom(seed);
  return (min: number, max: number): number => {
    const r = random();
    return Math.floor(r * (max - min + 1) + min);
  };
};

// Convert meters to miles
const metersToMiles = (num: number): number => num / 1609.344;

// Determine miles value for distance between two locations (lat/lon)
const calcDistance = (a: Location, b: Location): number => Math.round(metersToMiles(haversine(a, b)));

export class Generator {
  random: (min: number, max: number) => number;

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
  flight(origin: Airport, destination: Airport, departureTime: DateTime): Flight {
    // Generate a random flight number
    const flightNumber: string = this.random(1, 9999).toFixed(0).padStart(4, '0');

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

    const arrivalTime = departureTime.plus({ hours: duration.hours, minutes: duration.minutes }).setZone(destination.timezone);

    return {
      flightNumber,
      origin,
      destination,
      distance,
      duration,
      departureTime: departureTime.toISO(),
      arrivalTime: arrivalTime.toISO(),
      aircraft: randAircraft,
    };
  }
}
