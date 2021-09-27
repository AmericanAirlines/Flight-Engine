import { Flight } from './types';

class FlightCache {
  private flights: { [dateString: string]: Flight[] };

  constructor() {
    this.flights = {};
  }

  public cacheFlights(dateString: string, flights: Flight[]): void {
    this.flights[dateString] = flights;
  }
}

export const flightCache = new FlightCache();
