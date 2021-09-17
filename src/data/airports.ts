import { Airport } from '../types';

export const airports: Airport[] = [
  {
    code: 'DFW',
    city: 'Dallas-Fort Worth',
    timezone: 'America/Chicago',
    location: {
      latitude: 32.8998,
      longitude: 97.0403,
    },
  },
  {
    code: 'JFK',
    city: 'New York City',
    timezone: 'America/New_York',
    location: {
      latitude: 40.6413,
      longitude: 73.7781,
    },
  },
  {
    code: 'LAX',
    city: 'Los Angeles',
    timezone: 'America/Los_Angeles',
    location: {
      latitude: 33.9416,
      longitude: 118.4085,
    },
  },
  {
    code: 'ORD',
    city: 'Chicago',
    timezone: 'America/Chicago',
    location: {
      latitude: 41.9742,
      longitude: 87.9073,
    },
  },
];
