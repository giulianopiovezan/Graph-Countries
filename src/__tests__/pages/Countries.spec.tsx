import React from 'react';
import {
  render,
  fireEvent,
  screen,
  waitForElementToBeRemoved,
  waitFor,
} from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import Countries from '../../pages/Countries';
import { COUNTRIES_QUERY } from '../../queries/country';

const mocks = [
  {
    request: {
      query: COUNTRIES_QUERY,
    },
    result: {
      data: {
        Country: [
          {
            name: 'Brazil',
            capital: 'Brasilia',
            flag: {
              svgFile: 'https://restcountries.eu/data/bra.svg',
            },
          },
          {
            name: 'Argentia',
            capital: 'Buenos Aires',
            flag: {
              svgFile: 'https://restcountries.eu/data/arb.svg',
            },
          },
          {
            name: 'Chile',
            capital: 'Santiago',
            flag: {
              svgFile: 'https://restcountries.eu/data/chi.svg',
            },
          },
        ],
      },
    },
  },
];

const emptyMock = [
  {
    request: {
      query: COUNTRIES_QUERY,
    },
    result: {
      data: {
        Country: [],
      },
    },
  },
];

const errorMock = [
  {
    request: {
      query: COUNTRIES_QUERY,
    },
    error: new Error('An error ocurred'),
  },
];

jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe('Countries Page', () => {
  it('Should be able to list all countries', async () => {
    const { getAllByAltText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Countries />
      </MockedProvider>,
    );

    await waitForElementToBeRemoved(() => screen.getByText('Carregando...'));

    const imagesElements = getAllByAltText('country');

    expect(imagesElements.length).toBe(3);
  });

  it('Should be able to filter countries by name', async () => {
    const { getByPlaceholderText, getByAltText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Countries />
      </MockedProvider>,
    );

    await waitForElementToBeRemoved(() => screen.getByText('Carregando...'));

    const searchField = getByPlaceholderText('Pesquise um país');

    fireEvent.change(searchField, { target: { value: 'Brazil' } });

    await waitFor(() => {
      const flagImage = getByAltText('country');

      expect(flagImage.getAttribute('src')).toBe(
        'https://restcountries.eu/data/bra.svg',
      );
    });
  });

  it('Should be able to list all countries when search field is empty', async () => {
    const { getByPlaceholderText, getAllByAltText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Countries />
      </MockedProvider>,
    );

    await waitForElementToBeRemoved(() => screen.getByText('Carregando...'));

    const searchField = getByPlaceholderText('Pesquise um país');

    fireEvent.change(searchField, { target: { value: '' } });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const flagImages = getAllByAltText('country');

    expect(flagImages.length).toBe(3);
  });

  it('Should be able to show text when no countries found', async () => {
    const { getByText } = render(
      <MockedProvider mocks={emptyMock} addTypename={false}>
        <Countries />
      </MockedProvider>,
    );

    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(getByText('Nenhum país encontrado')).toBeInTheDocument();
  });

  it('Should be able to show text when error occurred', async () => {
    const { getByText } = render(
      <MockedProvider mocks={errorMock} addTypename={false}>
        <Countries />
      </MockedProvider>,
    );

    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(
      getByText('Ocorreu um erro ao carregar os países'),
    ).toBeInTheDocument();
  });
});
