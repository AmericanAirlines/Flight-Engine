import seedrandom from 'seedrandom';
import haversine from 'haversine-distance';
import aircraft from './Data/aircraft';

const createRandomGenerator = (seed: string): (() => number) => {
  const random = seedrandom(seed);
  return (min = 0, max = 0): number => {
    const r = random();
    return Math.floor(r * (max - min + 1) + min);
  };
};

// meters to miles
const calcDistance = (a: Location, b: Location): number => Math.round(haversine(a, b) / 1609.344);

export default class Generator {
  random: (min?: number, max?: number) => number;

  constructor(seed: string) {
    this.random = createRandomGenerator(seed);
  }

  numFlightsForRoute(): number {
    return this.random(5, 15);
  }

  flight(origin: Airport, destination: Airport): Flight {
    const flightNumber: string = this.random(1, 9999)
      .toFixed(0)
      .padStart(4, '0');

    const distance = calcDistance(origin.location, destination.location);

    const randAircraft = aircraft[this.random(0, aircraft.length - 1)];

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
