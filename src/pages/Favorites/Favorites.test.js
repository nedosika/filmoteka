import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Router from '../../router';
import { HANDLER_OPTIONS, METHODS, render, screen, setupServer } from '../../test-utils/test-library-utils';

const setupRender = () => {
  setupServer([
    {
      [HANDLER_OPTIONS.url]: 'http://localhost:5000/api/auth/signin',
      [HANDLER_OPTIONS.status]: 200,
      [HANDLER_OPTIONS.body]: {
        data: {
          accessToken: 'accessToken',
          refreshToken: 'refreshToken',
          user: { email: 'email@email.email', id: 'id', favorites: [] },
        },
        status: 'OK',
      },
      [HANDLER_OPTIONS.method]: METHODS.post,
    },
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
    <MemoryRouter>
      <Router />
    </MemoryRouter>,
  );
};

test('check redirect when expired token', async () => {
  setupRender();
});
