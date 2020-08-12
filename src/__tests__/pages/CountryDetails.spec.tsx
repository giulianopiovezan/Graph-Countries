import React from 'react';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import CountryDetails from '../../pages/CountryDetails';
import { COUNTRY_BY_NAME_QUERY } from '../../queries/country';

const mocks = [
  {
    request: {
      query: COUNTRY_BY_NAME_QUERY,
      variables: {
        countryName: 'Brazil',
      },
    },
    result: () => {
      return {
        data: {
          Country: [
            {
              name: 'Brazil',
              capital: 'Brasilia',
              area: 10000,
              population: 2000000,
              topLevelDomains: [
                {
                  name: '.br',
                },
              ],
              flag: {
                svgFile: 'https://restcountries.eu/data/bra.svg',
                emoji: '',
              },
              location: {
                latitude: 1,
                longitude: 1,
              },
              borders: [
                {
                  name: 'Argentina',
                  location: {
                    longitude: 2,
                    latitude: 2,
                  },
                },
              ],
              distanceToOtherCountries: [
                {
                  distanceInKm: 100,
                  countryName: 'Argentina',
                },
              ],
              local: null,
            },
          ],
        },
      };
    },
  },
];

const mocksWithLocalData = [
  {
    request: {
      query: COUNTRY_BY_NAME_QUERY,
      variables: {
        countryName: 'Brazil',
      },
    },
    result: () => {
      return {
        data: {
          Country: [
            {
              name: 'Brazil',
              capital: 'Brasilia',
              area: 10000,
              population: 2000000,
              topLevelDomains: [
                {
                  name: '.br',
                },
              ],
              flag: {
                svgFile: 'https://restcountries.eu/data/bra.svg',
                emoji: '',
              },
              location: {
                latitude: 1,
                longitude: 1,
              },
              borders: [
                {
                  name: 'Argentina',
                  location: {
                    longitude: 2,
                    latitude: 2,
                  },
                },
              ],
              distanceToOtherCountries: [
                {
                  distanceInKm: 100,
                  countryName: 'Argentina',
                },
              ],
              local: {
                name: 'Brazil',
                capital: 'Brasilia',
                area: 120000,
                population: 2708033,
                topLevelDomains: [
                  {
                    name: '.br',
                  },
                  {
                    name: '.en',
                  },
                ],
                flag: {
                  svgFile: 'https://restcountries.eu/data/bra.svg',
                },
              },
            },
          ],
        },
      };
    },
  },
];

const emptyMock = [
  {
    request: {
      query: COUNTRY_BY_NAME_QUERY,
      variables: {
        countryName: 'Brazil',
      },
    },
    result: () => {
      return {
        data: {
          Country: [],
        },
      };
    },
  },
];

const errorMock = [
  {
    request: {
      query: COUNTRY_BY_NAME_QUERY,
      variables: {
        countryName: 'Brazil',
      },
    },
    result: () => {
      return {
        data: {
          Country: [
            {
              name: 'Brazil',
              capital: 'Brasilia',
              area: 10000,
              population: 2000000,
              topLevelDomains: [
                {
                  name: '.br',
                },
              ],
              flag: {
                svgFile: 'https://restcountries.eu/data/bra.svg',
              },
              local: null,
            },
          ],
        },
      };
    },
    error: new Error('An error ocurred'),
  },
];

jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }: { children: React.ReactNode }) => children,
    useParams: () => ({
      countryName: 'Brazil',
    }),
  };
});

describe('Country Details Page', () => {
  it('Should be able to show details of specific country', async () => {
    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CountryDetails />
      </MockedProvider>,
    );

    await waitForElementToBeRemoved(() => screen.getByText('Carregando...'));

    expect(getByText('Brazil')).toBeInTheDocument();
    expect(getByText('Brasilia')).toBeInTheDocument();
  });

  it('Should be able to show details of specific country of client side saved cache', async () => {
    const { getByText } = render(
      <MockedProvider mocks={mocksWithLocalData} addTypename={false}>
        <CountryDetails />
      </MockedProvider>,
    );

    await waitForElementToBeRemoved(() => screen.getByText('Carregando...'));

    expect(getByText('Brazil')).toBeInTheDocument();
    expect(getByText('Brasilia')).toBeInTheDocument();
    expect(getByText('2708033')).toBeInTheDocument();
    expect(getByText('.en')).toBeInTheDocument();
  });

  it('Should be able to show feedback when no country found', async () => {
    const { getByText } = render(
      <MockedProvider mocks={emptyMock} addTypename={false}>
        <CountryDetails />
      </MockedProvider>,
    );

    await waitForElementToBeRemoved(() => screen.getByText('Carregando...'));

    expect(getByText('País não encontrado')).toBeInTheDocument();
  });

  it('Should be able to show feedback text when error occurred', async () => {
    const { getByText } = render(
      <MockedProvider mocks={errorMock} addTypename={false}>
        <CountryDetails />
      </MockedProvider>,
    );

    await waitForElementToBeRemoved(() => screen.getByText('Carregando...'));

    expect(
      getByText('Ocorreu um erro ao carregar as informações do país'),
    ).toBeInTheDocument();
  });
});
