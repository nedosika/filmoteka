import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Router from '../../router';
import { HANDLER_OPTIONS, METHODS, render, screen, setupServer } from '../../test-utils/test-library-utils';

const setupRender = async () => {
  render(
    <MemoryRouter initialEntries={['/fav']}>
      <Router />
    </MemoryRouter>,
  );

  const title = await screen.findByRole('heading', { level: 1 });

  return { title };
};

describe('check redirect when expired token', () => {
  test('By content', async () => {
    setupServer([
      {
        [HANDLER_OPTIONS.url]: 'http://localhost:5000/api/auth/refresh',
        [HANDLER_OPTIONS.status]: 400,
        [HANDLER_OPTIONS.body]: {
          message: 'Invalid Credentials',
          status: 'Invalid Credentials',
        },
        [HANDLER_OPTIONS.method]: METHODS.post,
      },
      {
        [HANDLER_OPTIONS.url]: 'http://localhost:5000/api/favorites',
        [HANDLER_OPTIONS.status]: 401,
        [HANDLER_OPTIONS.body]: {
          message: 'Invalid Token',
          status: 'Invalid',
        },
        [HANDLER_OPTIONS.method]: METHODS.get,
      },
    ]);
    const { title } = await setupRender();

    expect(title).toHaveTextContent(/sign in/i);
  });

  test('By history', async () => {
    const history = createMemoryHistory({
      initialEntries: ['/fav', '/signin'],
    });
    setupServer([
      {
        [HANDLER_OPTIONS.url]: 'http://localhost:5000/api/auth/refresh',
        [HANDLER_OPTIONS.status]: 400,
        [HANDLER_OPTIONS.body]: {
          message: 'Invalid Credentials',
          status: 'Invalid Credentials',
        },
        [HANDLER_OPTIONS.method]: METHODS.post,
      },
      {
        [HANDLER_OPTIONS.url]: 'http://localhost:5000/api/favorites',
        [HANDLER_OPTIONS.status]: 401,
        [HANDLER_OPTIONS.body]: {
          message: 'Invalid Token',
          status: 'Invalid',
        },
        [HANDLER_OPTIONS.method]: METHODS.get,
      },
    ]);

    render(
      <MemoryRouter history={history}>
        <Router />
      </MemoryRouter>,
    );

    expect(history.location.pathname).toBe('/signin');
  });
});
