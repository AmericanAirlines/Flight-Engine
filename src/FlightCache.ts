class FlightCache {
  private flights: { [dateString: string]: Flight[] };

  constructor() {
    this.flights = {};
  }

  public getFlights(dateString: string): Flight[] {
    return this.flights[dateString] || null;
  }

  public cacheFlights(dateString: string, flights: Flight[]): void {
    this.flights[dateString] = flights;
  }
}

export default new FlightCache();
