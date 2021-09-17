import express, { Express, RequestHandler } from 'express';
import supertest from 'supertest';
import type { ParamsDictionary } from 'express-serve-static-core';
import type { ParsedQs } from 'qs';

type TestRequestHandler = RequestHandler<ParamsDictionary, any, any, ParsedQs, Record<string, any>>;

interface CreateTestApp {
  (...handlers: TestRequestHandler[]): Express;
  (mappings: Record<string, TestRequestHandler>): Express;
}

export const createTestApp: CreateTestApp = (
  mappingsOrFirstHandler: Record<string, TestRequestHandler> | TestRequestHandler,
  ...restOfHandlers: TestRequestHandler[]
) => {
  const app = express();

  if (typeof mappingsOrFirstHandler === 'object') {
    const mappings = mappingsOrFirstHandler;

    for (const [path, handler] of Object.entries(mappings)) {
      app.use(path, handler);
    }
  } else {
    const handlers = [mappingsOrFirstHandler, ...restOfHandlers];

    app.use(handlers);
  }

  return app;
};

interface TestHandler {
  (handler: TestRequestHandler): supertest.SuperTest<supertest.Test>;
  (testApp: Express): supertest.SuperTest<supertest.Test>;
}

export const testHandler: TestHandler = (handler: TestRequestHandler | Express) => {
  if (handler.name === 'router') {
    return supertest(createTestApp(handler));
  }

  return supertest(handler);
};
