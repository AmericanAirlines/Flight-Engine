import airports from './Data/airports';
import Generator from './Generator';

class FlightCache {
  private flights: { [dateString: string]: Flight[] };

  constructor() {
    this.flights = {};
  }

  public getFlights(dateString: string): Flight[] {
    return this.flights[dateString] != null ? this.flights[dateString] : this.generateNewCache(dateString);
  }

  public cacheFlights(dateString: string, flights: Flight[]): void {
    this.flights[dateString] = flights;
  }

  private generateNewCache(dateString: string): Flight[] {
    const flights = [];

    const gen = new Generator(dateString);

    for (let i = 0; i < airports.length; i += 1) {
      // Iterate over all airports
      for (let j = airports.length - 1; j >= 0; j -= 1) {
        if (i !== j) {
          const origin = airports[i];
          const destination = airports[j];

          // For each O&D pair, create flights based on # per day
          const numFlights = gen.numFlightsForRoute();

          for (let k = 0; k <= numFlights; k += 1) {
            flights.push(gen.flight(origin, destination));
          }
        }
      }
    }

    // Cache flight data that was resulted in a cache miss
    this.cacheFlights(dateString, flights);
    return flights;
  }
}

export default new FlightCache();
