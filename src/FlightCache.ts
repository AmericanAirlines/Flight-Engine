class FlightCache {
  private flights: { [dateString: string]: Flight[] };

  constructor() {
    this.flights = {};
  }

  getFlights(dateString: string): Flight[] {
    return this.flights[dateString];
  }

  cacheFlights(dateString: string, flights: Flight[]): void {
    this.flights[dateString] = flights;
  }
}

export default new FlightCache();
