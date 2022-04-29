import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import AllTheProviders from '../../components/AllTheProviders';
import SnackStack from '../../components/SnackStack';
import { render, screen } from '../../test-utils/test-library-utils';
import Film from '../Film';
import Films from './Films';

test('display image for each film from server', async () => {
  render(
    <AllTheProviders>
      <MemoryRouter initialEntries={['/films']}>
        <Films />
      </MemoryRouter>
      <SnackStack />
    </AllTheProviders>,
  );

  const filmImages = await screen.findAllByRole('img', { name: /film$/i });

  expect(filmImages).toHaveLength(5);
});

test('display film title the film page', async () => {
  render(
    <AllTheProviders>
      <MemoryRouter initialEntries={['/films/S0JJ633X4aiEbszUcMXQ']}>
        <Film />
      </MemoryRouter>
      <SnackStack />
    </AllTheProviders>,
  );

  const title = await screen.findAllByText(/avatar$/i);
  expect(title).toHaveLength(2);
});
