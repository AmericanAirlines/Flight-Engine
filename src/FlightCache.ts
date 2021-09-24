import { Flight } from './types';

class FlightCache {
  private flights: { [dateString: string]: Flight[] };

  constructor() {
    this.flights = {};
  }

  public getFlights(dateString: string): Flight[] {
    return this.flights[dateString] || null;
  }

  public getFlightByFlightNumberAndDepartureDate(dateString: string, flightNumber: string): Flight[] {
    return this.flights[dateString].filter((flight) => flight.flightNumber === flightNumber);
  }

  public isEmpty(): boolean {
    return Object.keys(this.flights).length === 0;
  }

  public cacheFlights(dateString: string, flights: Flight[]): void {
    this.flights[dateString] = flights;
  }
}

export const flightCache = new FlightCache();
