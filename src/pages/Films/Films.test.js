import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { server } from '../../mocks/server';
import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from '../../test-utils/test-library-utils';
import Films from './Films';

const films = [
  {
    id: 'S0JJ633X4aiEbszUcMXQ',
    year: '2022',
    name: 'Avatar',
    genre: 'BlockBaster',
    description: 'Some descr',
    img: 'https://www.film.ru/sites/default/files/styles/thumb_1024x450/public/filefield_paths/fantasies_7.jpg',
    isFavorite: true,
  },
  {
    id: 'MGXuDQi1xg5ndJHF6NXO',
    description: '',
    img: 'https://www.film.ru/sites/default/files/styles/thumb_1024x450/public/filefield_paths/fantasies_7.jpg',
    year: '2001',
    name: 'Fantasies for olders',
    genre: 'RomCom',
    isFavorite: false,
  },
  {
    id: 'dSHi9Kv9wPGoAfAinZny',
    genre: 'Anime',
    name: 'Finch',
    year: '2021',
    description: 'Финч (2021)',
    img: 'https://avatars.mds.yandex.net/get-kinopoisk-image/4774061/301e49c0-d404-4fb6-b73d-a962f19b6349/600x900',
    isFavorite: true,
  },
  {
    id: 'fMXoAlNrr5cMll1TeWiK',
    img: 'https://scontent-iev1-1.xx.fbcdn.net/v/t1.6435-9/p180x540/98310531_105613404500749_4967628761613729792_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=e3f864&_nc_ohc=0xnlDZBosoMAX-_pc1T&_nc_ht=scontent-iev1-1.xx&oh=00_AT_qZKU-EsyownjO42WLcHz11oGgQtmRakOa2Su-InQnQg&oe=62213834',
    description: '',
    year: 1998,
    genre: 'Anime',
    name: 'Futurama',
    isFavorite: false,
  },
  {
    id: 'Eo6lVYIgsKTKd8fmQHUF',
    description: '',
    name: 'God Father 1',
    year: 1995,
    img: 'https://ixbt.online/live/topics/preview/00/01/73/85/f08faf1005.jpg',
    genre: 'Detective',
    isFavorite: false,
  },
  {
    id: 'Eo6lVYIgsKTKd8fmQHUFa',
    description: '',
    name: 'God Father 2',
    year: 1995,
    img: 'https://ixbt.online/live/topics/preview/00/01/73/85/f08faf1005.jpg',
    genre: 'Detective',
    isFavorite: false,
  },
  {
    id: 'Eo6lVYIgsKTKd8fmQsdsd',
    description: '',
    name: 'God Father 3',
    year: 1995,
    img: 'https://ixbt.online/live/topics/preview/00/01/73/85/f08faf1005.jpg',
    genre: 'Detective',
    isFavorite: false,
  },
];

const renderFilmsWithMockData = () => {
  server.resetHandlers(
    rest.get('http://localhost:5000/api/films', (req, res, ctx) => {
      const page = req.url.searchParams.get('page') || 1;
      const limit = req.url.searchParams.get('limit') || 5;
      const order = req.url.searchParams.get('order') || 'ASC';
      const field = req.url.searchParams.get('field') || 'name';

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const data = films
        .slice()
        .sort((a, b) => (order === 'ASC' ? (a[field] > b[field] ? 1 : -1) : a[field] < b[field] ? 1 : -1))
        .slice(startIndex, endIndex);

      return res(
        ctx.json({
          data,
          page,
          limit,
          size: films.length,
        }),
      );
    }),
  );

  render(
    <MemoryRouter>
      <Films />
    </MemoryRouter>,
  );
};

describe('check films count', () => {
  test('test default films count', async () => {
    renderFilmsWithMockData();

    //finding selectors wrapper
    const filmsCountSelectorWrapper = screen.getByTestId('films-per-page');
    expect(filmsCountSelectorWrapper).toBeInTheDocument();

    //getting the first children element
    const filmsCountSelector = filmsCountSelectorWrapper.childNodes[0];

    //check default value
    expect(filmsCountSelector).toHaveTextContent('5');

    //check displaying default films count
    const filmCards = await screen.findAllByTestId('films-item');

    expect(filmCards.length).toBe(5);
  });

  test('test change films count', async () => {
    renderFilmsWithMockData();

    //finding selectors wrapper
    const filmsCountSelectorWrapper = await screen.findByTestId('films-per-page');
    expect(filmsCountSelectorWrapper).toBeInTheDocument();

    //getting the first children element
    const filmsCountSelector = filmsCountSelectorWrapper.childNodes[0];

    //Clicking to the selector
    userEvent.click(filmsCountSelector);

    //Selecting the count films equal 10
    const optionsPopupEl = await screen.findByRole('listbox');

    fireEvent.click(within(optionsPopupEl).getByText(/10/i));
    expect(filmsCountSelector).toHaveTextContent('10');

    //check displaying films count
    await waitFor(() => {
      const filmCards = screen.getAllByTestId('films-item');

      expect(filmCards).toHaveLength(7);
    });
  });
});

test('test pagination', async () => {
  renderFilmsWithMockData();

  await screen.findAllByTestId(/title/i);

  const pagination = await screen.findByTestId('pagination');
  expect(pagination).toBeInTheDocument();

  const paginationButtons = pagination.childNodes[0].childNodes;
  expect(paginationButtons).toHaveLength(4);

  fireEvent.click(within(pagination).getByText('2'));

  const ids = ['Eo6lVYIgsKTKd8fmQHUFa', 'Eo6lVYIgsKTKd8fmQsdsd'];

  //check displaying films on second page
  const filmCards = await screen.findAllByTestId('films-item');

  filmCards.forEach((item, index) => expect(item.id).toBe(ids[index]));
});

describe('check sorting', () => {
  test('name desc', async () => {
    renderFilmsWithMockData();

    await screen.findAllByTestId(/title/i);

    const sortSelectorWrapper = await screen.findByTestId('sort');
    expect(sortSelectorWrapper).toBeInTheDocument();

    const sortSelector = sortSelectorWrapper.childNodes[0];
    userEvent.click(sortSelector);

    const optionsPopupEl = await screen.findByRole('listbox');

    fireEvent.click(within(optionsPopupEl).getByText(/name desc/i));
    expect(sortSelector).toHaveTextContent(/name desc/i);

    await waitForElementToBeRemoved(() => screen.getAllByTestId(/skeleton/i));

    const filmNames = [
      'Avatar',
      'Fantasies for olders',
      'Finch',
      'Futurama',
      'God Father 1',
      'God Father 2',
      'God Father 3',
    ].reverse();

    const filmTitles = await screen.findAllByTestId('title');
    filmTitles.forEach((title, index) => {
      expect(title).toHaveTextContent(filmNames[index]);
    });
  });

  test('year asc', async () => {
    renderFilmsWithMockData();

    await screen.findAllByTestId(/extra-information/i);

    const sortSelectorWrapper = await screen.findByTestId('sort');

    const sortSelector = sortSelectorWrapper.childNodes[0];
    userEvent.click(sortSelector);

    const optionsPopupEl = await screen.findByRole('listbox');

    fireEvent.click(within(optionsPopupEl).getByText(/year asc/i));
    expect(sortSelector).toHaveTextContent(/year asc/i);

    await waitForElementToBeRemoved(() => screen.getAllByTestId(/skeleton/i));

    const years = ['2022', '2021', '2001', '1998', '1995', '1995', '1995'].reverse();

    const filmExtras = await screen.findAllByTestId(/extra-information/i);

    filmExtras.forEach((information, index) => {
      //console.log(information.textContent, '-', years[index]);
      expect(information).toHaveTextContent(new RegExp(`${years[index]}`));
    });
  });

  test('genre desc', async () => {
    renderFilmsWithMockData();

    await screen.findAllByTestId(/extra-information/i);

    const sortSelectorWrapper = await screen.findByTestId('sort');
    const sortSelector = sortSelectorWrapper.childNodes[0];
    userEvent.click(sortSelector);
    const optionsPopupEl = await screen.findByRole('listbox');
    fireEvent.click(within(optionsPopupEl).getByText(/genre desc/i));
    expect(sortSelector).toHaveTextContent(/genre desc/i);

    await waitForElementToBeRemoved(() => screen.getAllByTestId(/skeleton/i));

    const genres = ['Anime', 'Anime', 'BlockBaster', 'Detective', 'Detective', 'Detective', 'RomCom'].reverse();

    const filmExtras = await screen.findAllByTestId(/extra-information/i);

    filmExtras.forEach((information, index) => {
      expect(information).toHaveTextContent(new RegExp(`${genres[index]}`));
    });
  });
});
