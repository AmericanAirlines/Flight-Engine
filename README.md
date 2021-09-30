# Flight Engine

Mock flight data delivered simply and quickly without a database.

## Let's Get Started

### 👉 [I just want flight data](#deploy-flight-engine-and-use-now)

### 👉 [I want a backend that I can customize](https://github.com/AmericanAirlines/Flight-Engine/blob/main/docs/LOCAL_DEVELOPMENT.MD)

---

## Deploy Flight Engine and Use Now

If you would like to just use Flight Engine as we have designed it, deploy a copy to Heroku using the button below.

**NOTE**: If you go with this approach, you will not be able to customize Flight Engine.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

---

## Airport Related

Each endpoint displays information related to the airport whose IATA (Airport Code) is provided with the request:

- [Airport Information](https://github.com/AmericanAirlines/Flight-Engine/blob/main/docs/AIRPORTS.md#success-response): `GET /airports?code=<IATA-CODE>`

---

## Flight Related

- [Flight Records By Date](https://github.com/AmericanAirlines/Flight-Engine/blob/main/docs/FLIGHTS.md#default-success-response): `GET /flights?date=YYYY-MM-DD`

- [Flight Records By Origin](https://github.com/AmericanAirlines/Flight-Engine/blob/main/docs/FLIGHTS.md#origin-success-response): `GET /flights?date=YYYY-MM-DD&destination=<IATA-CODE>`

- [Flight Records By Destination](https://github.com/AmericanAirlines/Flight-Engine/blob/main/docs/FLIGHTS.md#desitnation-success-response): `GET /flights?date=YYYY-MM-DD&destination=<IATA-CODE>`

---

## Testing

This project utilizes framework uses Facebook's [Jest](https://facebook.github.io/jest/) framework for testing.

Writing a test is as simple as creating a `*.test.ts` file in the `./src` directory along with an associated `describe()` and `it()` function.

Simply run `npm run test` to run the existing test suite or use it to execute your own tests once you've created new ones.

Additional testing scripts:

- `test`: runs all tests
- `test:changed`: runs tests related to uncommited git changes only

---

## Contributing

Interested in contributing to the project? Check out our [Contributing Guidelines](.github/CONTRIBUTING.md).
