import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import FilmCard from '@Components/FilmCard';
import { render, screen } from '@TestUtils/test-library-utils';

const film = {
  id: 'S0JJ633X4aiEbszUcMXQ',
  year: '2022',
  name: 'Avatar',
  genre: 'BlockBaster',
  description: 'Some descr',
  img: '',
  isFavorite: true,
};

test('test displaying film content', async () => {
  render(
    <MemoryRouter>
      <FilmCard film={film} />
    </MemoryRouter>,
  );

  const filmTitle = await screen.findByTestId('title');
  const filmExtra = await screen.findByTestId('extra-information');
  const filmDescription = await screen.findByTestId('description');

  expect(filmTitle).toHaveTextContent('Avatar');
  expect(filmDescription).toHaveTextContent('Some descr');
  expect(filmExtra).toHaveTextContent('2022, BlockBaster');
});
