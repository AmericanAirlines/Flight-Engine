/* istanbul ignore file */

export interface Aircraft {
  model: string;
  speed: number;
  passengerCapacity: {
    total: number;
    main: number;
    first: number;
  };
}

export interface Airport {
  code: string; // Airport code, typically 3 characters
  city: string; // Airport city name
  timezone: string; // IANA timezone string
  location: Location;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface FlightDuration {
  hours: number;
  minutes: number;
  locale: string;
}

export interface Flight {
  flightNumber: string;
  aircraft: Aircraft;
  origin: Airport;
  destination: Airport;
  distance: number;
  duration: FlightDuration;
  departureTime: string;
  arrivalTime: string;
}

export interface FlightQueryParams {
  date: string;
  origin?: string;
  destination?: string;
}
