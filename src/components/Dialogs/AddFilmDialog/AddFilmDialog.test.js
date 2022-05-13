import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { server } from '../../../mocks/server';
import { fireEvent, render, screen } from '../../../test-utils/test-library-utils';
import AddFilmDialog from './AddFilmDialog';

const setup = () => {
  render(
    <MemoryRouter>
      <AddFilmDialog />
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="film/:id" element={<div>Film page</div>} />
      </Routes>
    </MemoryRouter>,
  );

  const title = screen.getByTestId('title');
  const inputName = screen.getByLabelText('Name');
  const inputImgLink = screen.getByTestId('film-img-link');
  const img = screen.getByTestId('film-img');
  const nextButton = screen.getByRole('button', { name: /next/i });

  return { title, inputName, inputImgLink, img, nextButton };
};

describe('Check add film dialog', () => {
  test('test default state', async () => {
    const { title, inputName, inputImgLink, img, nextButton } = setup();

    expect(title).toHaveTextContent(/step 1/i);

    expect(inputName).toBeInTheDocument();

    expect(inputImgLink).toBeInTheDocument();

    expect(img).toBeInTheDocument();

    expect(nextButton).toBeInTheDocument();
  });

  test('test validation step 1', async () => {
    const { nextButton, inputName } = setup();

    fireEvent.click(nextButton);
    expect(await screen.findByText(/Required/i)).toBeInTheDocument();

    fireEvent.change(inputName, { target: { value: 'on' } });
    expect(await screen.findByText(/Must be 3 symbols or more/i)).toBeInTheDocument();
    expect(nextButton).toBeDisabled();

    fireEvent.change(inputName, { target: { value: 'some text' } });
    expect(await screen.findByText(/Must be 3 symbols or more/i)).not.toBeInTheDocument();
    expect(nextButton).toBeEnabled();
  });

  test('test validation step 2', async () => {
    const { inputName, nextButton } = setup();
    fireEvent.change(inputName, { target: { value: '1234' } });
    userEvent.click(nextButton);

    const title = await screen.findByTestId('title-step-2');
    expect(title).toHaveTextContent(/step 2/i);

    const inputNameS2 = screen.getByLabelText('Name');
    fireEvent.change(inputNameS2, { target: { value: '12' } });
    expect(await screen.findByText(/Must be 3 symbols or more/i)).toBeInTheDocument();

    fireEvent.change(inputNameS2, { target: { value: '1234' } });
    expect(await screen.findByText(/Must be 3 symbols or more/i)).not.toBeInTheDocument();

    const addButton = screen.getByRole('button', { name: /add/i });
    expect(addButton).toBeEnabled();
  });

  test('test submitting error ', async () => {
    server.resetHandlers(
      rest.post('http://localhost:5000/api/films', (req, res, ctx) => {
        return res(ctx.status(500));
      }),
    );

    const { inputName, nextButton } = setup();
    fireEvent.change(inputName, { target: { value: '1234' } });
    userEvent.click(nextButton);

    const addButton = await screen.findByRole('button', { name: /add/i });
    fireEvent.click(addButton);

    const title = await screen.findByTestId(/title-step-3/i);
    expect(title).toHaveTextContent(/step 3 saving/i);

    const errorMessage = await screen.findByText(/error/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test('test submitting success ', async () => {
    server.resetHandlers(
      rest.post('http://localhost:5000/api/films', (req, res, ctx) => {
        return res(ctx.json({ data: { id: 123 } }));
      }),
    );

    const { inputName, nextButton } = setup();
    fireEvent.change(inputName, { target: { value: '1234' } });
    userEvent.click(nextButton);

    const addButton = await screen.findByRole('button', { name: /add/i });
    fireEvent.click(addButton);

    const title = await screen.findByTestId(/title-step-3/i);
    expect(title).toHaveTextContent(/step 3 saving/i);

    const errorMessage = await screen.findByText(/added ok/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test('test redirect to the new film card', async () => {
    server.resetHandlers(
      rest.post('http://localhost:5000/api/films', (req, res, ctx) => {
        return res(ctx.json({ data: { id: 123, name: 'test film name' } }));
      }),
    );

    const { inputName, nextButton } = setup();
    fireEvent.change(inputName, { target: { value: '1234' } });
    userEvent.click(nextButton);

    const addButton = await screen.findByRole('button', { name: /add/i });
    fireEvent.click(addButton);

    const title = await screen.findByTestId(/title-step-3/i);
    expect(title).toHaveTextContent(/step 3 saving/i);

    const errorMessage = await screen.findByText(/added ok/i);
    expect(errorMessage).toBeInTheDocument();

    const okButton = screen.getByRole('button', { name: /ok/i });
    fireEvent.click(okButton);

    const newFilmPageContent = await screen.findByText(/Film page/i);
    expect(newFilmPageContent).toBeInTheDocument();
  });
});
