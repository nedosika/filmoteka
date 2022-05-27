import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Router from '../../router';
import { HANDLER_OPTIONS, METHODS, fireEvent, render, screen, setupServer } from '../../test-utils/test-library-utils';

const setupRender = async () => {
  render(
    <MemoryRouter initialEntries={['/signin']}>
      <Router />
    </MemoryRouter>,
  );

  const title = await screen.findByRole('heading', { level: 1 });
  const email = screen.getByLabelText(/email/i);
  const password = screen.getByLabelText(/password/i);
  const loginBtn = screen.getByRole('button', { value: /login/i });
  const registerLink = screen.getByText("Don't have an account? Sign Up");

  return { title, email, password, loginBtn, registerLink };
};

describe('Auth tests', () => {
  test('test default state of login form', async () => {
    setupServer([
      {
        [HANDLER_OPTIONS.url]: 'http://localhost:5000/api/auth/signin',
        [HANDLER_OPTIONS.status]: 400,
        [HANDLER_OPTIONS.body]: {
          message: 'All input is required',
          status: 'Required',
        },
        [HANDLER_OPTIONS.method]: METHODS.post,
      },
    ]);

    const { title, email, password, loginBtn, registerLink } = await setupRender();

    expect(title).toHaveTextContent(/sign in/i);
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(loginBtn).toBeEnabled();
    expect(registerLink).toHaveAttribute('href', '/signup');

    fireEvent.click(loginBtn);
    expect(loginBtn).toBeDisabled();

    const errorMessage = await screen.findByText(/All input is required/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test('test error login', async () => {
    const { loginBtn } = await setupRender();

    setupServer([
      {
        [HANDLER_OPTIONS.url]: 'http://localhost:5000/api/auth/signin',
        [HANDLER_OPTIONS.status]: 400,
        [HANDLER_OPTIONS.body]: {
          message: 'All input is required',
          status: 'Required',
        },
        [HANDLER_OPTIONS.method]: METHODS.post,
      },
    ]);

    fireEvent.click(loginBtn);
    expect(loginBtn).toBeDisabled();

    const errorMessage = await screen.findByText('All input is required');
    expect(errorMessage).toBeInTheDocument();
  });

  test('test login and logout', async () => {
    const { loginBtn } = await setupRender();

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
    ]);

    fireEvent.click(loginBtn);

    const accountIcon = await screen.findByTestId(/account/i);
    expect(accountIcon).toBeInTheDocument();

    const menuButton = screen.getByTestId('menu-button');
    fireEvent.click(menuButton);

    const logoutBtn = screen.getByTestId('sidebar-logout-btn');
    fireEvent.click(logoutBtn);

    expect(accountIcon).not.toBeInTheDocument();
  });
});
