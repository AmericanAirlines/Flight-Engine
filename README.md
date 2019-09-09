# Flight Engine
Mock flight data delivered simply and quickly without a database.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Developing Locally
First, make sure you have [Node.js and npm](https://nodejs.org/en/download/) and [MongoDB](https://docs.mongodb.com/manual/installation/) installed, then install remaining project dependencies by running `npm install`.

After dependencies have been installed, run `npm run dev`, which will perform the following actions:
- Transpile TS into `dist` from `src`
- Start the application
- Watch `src` for changes, and transpile into `dist` again after observed changes
- Watch `dist` for changes and restart the application after observed changes

Once the app has started, try hitting `localhost:3030` (`3030` is the default port unless overridden from `.env`) from a browser.

## Testing
This project utilizes framework uses Facebook's [Jest](https://facebook.github.io/jest/) framework for testing. Jest is based on the `Jasmine` framework. While some developers prefer `Mocha`, we've chosen to fully adopt `Jest` on top of `Jasmine` as-is until a significant need requires an alternative solution.

Writing a test is as simple as creating a `*.test.ts` file in the `./src` directory along with an associated `describe()` and `test()` function.

Simply run `npm run test` to run tests.

Additional testing scripts:
- `test`: runs all tests
- `test:changed`: runs tests related to uncommited git changes only

## Contributing
Interested in contributing to the project? Check out our [Contributing Guidelines](.github/CONTRIBUTING.md).