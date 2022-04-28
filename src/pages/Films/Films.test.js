import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AllTheProviders from '../../components/AllTheProviders';
import SnackStack from '../../components/SnackStack';
import { render, screen } from '../../test-utils/test-library-utils';
import Films from './Films';

test('display image for each film from server', async () => {
  render(
    <AllTheProviders>
      <BrowserRouter>
        <Films />
      </BrowserRouter>
      <SnackStack />
    </AllTheProviders>,
  );

  const filmImages = await screen.findAllByRole('img', { name: /film$/i });

  expect(filmImages).toHaveLength(5);
});
