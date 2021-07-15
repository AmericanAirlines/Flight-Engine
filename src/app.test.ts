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

describe('GET /airport', () => {
  const badParamsCode = 400;
  it('returns an error when code is not provided ', (done) => {
    supertest(app)
      .get('/airport')
      .expect(badParamsCode, done);
  });

  it('returns an error when code is malformed ', (done) => {
    supertest(app)
      .get('/airport?code=junk')
      .expect(badParamsCode, done);
  });

  it('returns an error when code is malformed ', (done) => {
    supertest(app)
      .get('/airport?code=D4W')
      .expect(badParamsCode, done);
  });

  it('returns an error when code is not in airport data ', (done) => {
    const invalidCode = 'BNA';
    supertest(app)
      .get(`/airport?code=${invalidCode}`)
      .expect(badParamsCode, done);
  });

  it('retrieves the same data when hit multiple times', (done) => {
    const codeString = 'DFW';
    supertest(app)
      .get(`/airport?code=${codeString}`)
      .expect(200, (err1, res1) => {
        expect(err1).toBeNull();
        const airport1 = Object.keys(res1.body).length;
        expect(airport1).toBeGreaterThan(0);
        supertest(app)
          .get(`/airport?code=${codeString}`)
          .expect(200, (err2, res2) => {
            expect(err2).toBeNull();
            const airport2 = Object.keys(res2.body).length;
            expect(airport2).toBeGreaterThan(0);

            expect(airport1).toEqual(airport2);
            done();
          });
      });
  });
});
