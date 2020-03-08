import seedrandom from 'seedrandom';
import haversine from 'haversine-distance';
import { DateTime } from 'luxon';
import aircraft from './Data/aircraft';
import { firstNames, lastNames } from './Data/names';

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

// Convert meters to miles
const metersToMiles = (num: number): number => num / 1609.344;

// Determine miles value for distance between two locations (lat/lon)
const calcDistance = (a: Location, b: Location): number => Math.round(metersToMiles(haversine(a, b)));

// From a given flight and list of all flights, returns another flight
// that could be a possible connection.
const getAvailableConnections = (targetFlight: Flight, allFlights: Flight[]): Flight[] => {
  // filtering for same airport, and a departure time that is after target arrival time
  const availableFlights = allFlights
    .filter((flight) => flight.origin.code === targetFlight.destination.code)
    .filter((flight) => new Date(flight.departureTime) > new Date(targetFlight.arrivalTime));

  return availableFlights;
};

// Calculate duration given two times.
// const calculateDuration = (arrivalTime: string, departureTime: string): FlightDuration => {
//  const arrivalDateTime: Date = new Date(arrivalTime);
//  const departureDateTime: Date = new Date(departureTime);
//
//  const hours: number = departureDateTime.getHours() - arrivalDateTime.getHours();
//  const minutes: number = departureDateTime.getMinutes() - arrivalDateTime.getMinutes();
//  const locale = `${hours}h ${minutes}m`;
//
//  return {
//    hours,
//    minutes,
//    locale,
//  };
// };

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
  flight(origin: Airport, destination: Airport, departureTime: DateTime): Flight {
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

  bag = (): Bag => {
    // Generate a bag tag following 'AAXXXXXX' format
    const tagNumber = `AA${this.random(1, 999999)
      .toFixed(0)
      .padStart(6, '0')}`;
    const weight: number = this.random(10, 50);
    const dimension: number = this.random(30, 62);

    return {
      tagNumber,
      weight,
      dimension,
    };
  };

  numPassengers(): number {
    return this.random(15, 25);
  }

  // Creates a new passenger with a list of flights
  passenger(allFlights: Flight[]): Passenger {
    // Create random name for passenger using predefined list of first/last names
    const firstName: string = firstNames[this.random(0, firstNames.length - 1)];
    const lastName: string = lastNames[this.random(0, lastNames.length - 1)];
    const flights: string[] = [];
    const bags: Bag[] = [];

    // Soft number. The actual number of flights could be less.
    const maxFlights: number = this.random(1, 4);

    // Pick random flight for passenger.
    let currFlight: Flight = allFlights[this.random(0, flights.length - 1)];
    flights.push(currFlight.flightNumber);

    // Pick rest of flights
    for (let i = 1; i < maxFlights; i += 1) {
      // Pick a random connecting flight from available flights
      const availableFlights = getAvailableConnections(currFlight, allFlights);

      // Possible that there are no connecting flights. If that is the case just stop adding flights.
      if (availableFlights.length === 0) {
        break;
      }

      currFlight = availableFlights[this.random(0, availableFlights.length - 1)];
      flights.push(currFlight.flightNumber);
    }

    /*
    console.log("DEBUG - AVAILABLE FLIGHTS:");
    for (let i = 0; i < availableFlights.length; i++) {
      const layover: FlightDuration = calculateDuration(currFlight.arrivalTime, availableFlights[i].departureTime);
      console.log(`Flight ${i + 1} (${layover.locale})`, availableFlights[i]);
    }
    */

    // Create a random number of bags for the passenger
    const maxBags: number = this.random(0, 5);
    for (let i = 0; i < maxBags; i += 1) {
      const bag: Bag = this.bag();
      bags.push(bag);
    }

    return {
      firstName,
      lastName,
      flights,
      bags,
    };
  }
}
