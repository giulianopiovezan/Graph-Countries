import React from 'react';
import {
  render,
  screen,
  waitForElementToBeRemoved,
  fireEvent,
} from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import CountryEdit from '../../pages/CountryEdit';
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
              },
              local: null,
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
          Country: [],
        },
      };
    },
    error: new Error('An error ocurred'),
  },
];

const mockedPush = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }: { children: React.ReactNode }) => children,
    useHistory: () => ({
      push: mockedPush,
    }),
    useParams: () => ({
      countryName: 'Brazil',
    }),
  };
});

jest.mock('../../cache.ts', () => ({
  countriesVar: (value: any[] = []) =>
    [
      {
        name: 'Argentina',
        capital: 'Buenos Aires',
        area: 10000,
        population: 2000000,
        topLevelDomains: [
          {
            name: '.arg',
          },
        ],
        flag: {
          svgFile: 'https://restcountries.eu/data/arg.svg',
        },
        local: null,
      },
    ].concat(value),
}));

const alertMocked = jest.spyOn(window, 'alert').mockImplementation(() => {});

describe('Country Edit Page', () => {
  it('Should be able to update details of specific country', async () => {
    const { getByText, getByLabelText, getByPlaceholderText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CountryEdit />
      </MockedProvider>,
    );

    await waitForElementToBeRemoved(() => screen.getByText('Carregando...'));

    // getting elements
    const populationField = getByLabelText('População');
    const areaField = getByLabelText('Área');
    const topLevalDomain = getByPlaceholderText('Adicionar nível de domínio');
    const addTopLevalDomainButton = getByText('Adicionar');
    const removeTopLevalDomainButton = getByText('Remover');
    const submitButton = getByText('SALVAR');

    // trigger events
    fireEvent.change(populationField, { target: { value: 259000000 } });
    fireEvent.change(areaField, { target: { value: 9000000 } });
    fireEvent.change(topLevalDomain, { target: { value: '.en' } });
    fireEvent.click(removeTopLevalDomainButton, '.br');
    fireEvent.click(addTopLevalDomainButton);

    // check changes
    expect(populationField.getAttribute('value')).toBe('259000000');
    expect(areaField.getAttribute('value')).toBe('9000000');
    expect(getByText('.en')).toBeInTheDocument();

    fireEvent.click(submitButton);

    expect(alertMocked).toHaveBeenCalledWith('Atualizado com sucesso');
    expect(mockedPush).toHaveBeenCalledWith('/countries');
  });

  it('Should not be able to add duplicated top level domain', async () => {
    const { getByText, getByPlaceholderText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CountryEdit />
      </MockedProvider>,
    );

    await waitForElementToBeRemoved(() => screen.getByText('Carregando...'));

    const topLevalDomain = getByPlaceholderText('Adicionar nível de domínio');
    const addTopLevalDomainButton = getByText('Adicionar');

    fireEvent.change(topLevalDomain, { target: { value: '.br' } });
    fireEvent.click(addTopLevalDomainButton);

    expect(alertMocked).toHaveBeenCalledWith('Nível de domínio já cadastrado.');
  });

  it('Should be able to show feedback when no country found', async () => {
    const { getByText } = render(
      <MockedProvider mocks={emptyMock} addTypename={false}>
        <CountryEdit />
      </MockedProvider>,
    );

    await waitForElementToBeRemoved(() => screen.getByText('Carregando...'));

    expect(getByText('País não encontrado')).toBeInTheDocument();
  });

  it('Should be able to show feedback text when error occurred', async () => {
    const { getByText } = render(
      <MockedProvider mocks={errorMock} addTypename={false}>
        <CountryEdit />
      </MockedProvider>,
    );

    await waitForElementToBeRemoved(() => screen.getByText('Carregando...'));

    expect(
      getByText('Ocorreu um erro ao carregar as informações do país'),
    ).toBeInTheDocument();
  });
});
