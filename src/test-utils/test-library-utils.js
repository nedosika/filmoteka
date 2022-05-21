import { render } from '@testing-library/react';
import { rest } from 'msw';
import AllTheProviders from '../components/AllTheProviders';
import { server } from '../mocks/server';

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options });

const METHODS = {
  post: 'post',
  get: 'get',
  delete: 'delete',
  put: 'put',
};

const HANDLER_OPTIONS = {
  url: 'url',
  status: 'status',
  method: 'method',
  body: 'body',
};

const setupServer = (handlers = []) => {
  server.resetHandlers(
    ...handlers.map(({ url = 'http://localhost:5000', status = 200, body, method = METHODS.get }) =>
      rest[method](url, (req, res, ctx) => {
        return res(ctx.status(status), ctx.json(body));
      }),
    ),
  );
};

export { customRender as render, setupServer, METHODS, HANDLER_OPTIONS };

export * from '@testing-library/react';
