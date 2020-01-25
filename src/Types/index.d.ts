declare module 'haversine-distance';

declare interface Aircraft {
  model: string;
  speed: number;
  passengerCapacity: {
    total: number;
    main: number;
    first: number;
  };
}

declare interface Airport {
  code: string; // Airport code, typically 3 characters
  city: string; // Airport city name
  timezone: string; // IANA timezone string
  location: Location;
}

declare interface Location {
  latitude: number;
  longitude: number;
}

declare interface Bag {
  tagNumber: string;
  weight: number; // Weight in pounds
  dimension: number; // length + width + height in inches
}

declare interface Passenger {
  flights: string[]; // Array of flight numbers that a passenger has tickets for
  firstName: string;
  lastName: string;
  bags?: Bag[];
}

declare interface FlightDuration {
  hours: number;
  minutes: number;
  locale: string;
}

declare interface Flight {
  flightNumber: string;
  aircraft: Aircraft;
  origin: Airport;
  destination: Airport;
  distance: number;
  duration: FlightDuration;
  departureTime: string;
  arrivalTime: string;
}

declare interface FlightQueryParams {
  date: string;
  origin?: string;
  destination?: string;
}
