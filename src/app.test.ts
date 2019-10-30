import 'jest';
import supertest from 'supertest';
import app from './app';

describe('GET /', () => {
  it('responds successfully', (done) => {
    supertest(app)
      .get('/')
      .expect(200, done);
  });
});

describe('GET /flights', () => {
  const badParamsCode = 400;
  it('returns an error when date is not provided ', (done) => {
    supertest(app)
      .get('/flights')
      .expect(badParamsCode, done);
  });

  it('returns an error when date is malformed ', (done) => {
    supertest(app)
      .get('/flights?date=junk')
      .expect(badParamsCode, done);
  });

  it('retrieves the same data when hit multiple times', (done) => {
    const dateString = '2020-01-01';
    supertest(app)
      .get(`/flights?date=${dateString}`)
      .expect(200, (err1, res1) => {
        expect(err1).toBeNull();
        const flights1 = res1.body;
        expect(flights1.length).toBeGreaterThan(0);
        supertest(app)
          .get(`/flights?date=${dateString}`)
          .expect(200, (err2, res2) => {
            expect(err2).toBeNull();
            const flights2 = res2.body;
            expect(flights2.length).toBeGreaterThan(0);

            expect(flights1).toEqual(flights2);
            done();
          });
      });
  });
});

describe('GET /flight', () => {
  const badParamsCode = 400;
  it('returns an error when date and flight number are not provided ', (done) => {
    supertest(app)
      .get('/flight')
      .expect(badParamsCode, done);
  });

  it('returns an error when date is malformed ', (done) => {
    supertest(app)
      .get('/flight?date=junk')
      .expect(badParamsCode, done);
  });

  it('returns an error when date is provided but the flight number is not ', (done) => {
    supertest(app)
      .get('/flight?date=2020-01-01')
      .expect(badParamsCode, done);
  });

  it('retrieves the same data when hit multiple times', (done) => {
    const dateString = '2019-11-21';
    const flightNumber = '4489';
    supertest(app)
      .get(`/flight?date=${dateString}&flightNumber=${flightNumber}`)
      .expect(200, (err1, res1) => {
        expect(err1).toBeNull();
        const flightData1 = res1.body;
        expect(flightData1.length).toBeGreaterThanOrEqual(0);
        supertest(app)
          .get(`/flight?date=${dateString}&flightNumber=${flightNumber}`)
          .expect(200, (err2, res2) => {
            expect(err2).toBeNull();
            const flightData2 = res2.body;
            expect(flightData2.length).toBeGreaterThanOrEqual(0);
            expect(flightData1).toEqual(flightData2);
            done();
          });
      });
  });
});
