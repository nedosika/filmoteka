import React from 'react';
import AllTheProviders from '../../AllTheProviders';
import { render, screen } from '../../test-utils/testing-library-utils';
import Films from './Films';

test('render films', async () => {
  render(
    <AllTheProviders>
      <Films />
    </AllTheProviders>,
  );

  const title = screen.getByText('test title');

  expect(title).toBe();
});
