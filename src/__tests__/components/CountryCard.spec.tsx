import React from 'react';
import { render } from '@testing-library/react';

import CountryCard from '../../components/CountryCard';

jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe('Country Card Component', () => {
  it('Should be able to show details of specific country', async () => {
    const { getByText, getByAltText } = render(
      <CountryCard
        name="Brazil"
        capital="Brasilia"
        flagUrl="https://restcountries.eu/data/bra.svg"
      />,
    );

    expect(getByText('Brazil')).toBeInTheDocument();
    expect(getByText('Brasilia')).toBeInTheDocument();
    expect(getByAltText('country').getAttribute('src')).toBe(
      'https://restcountries.eu/data/bra.svg',
    );
  });
});
