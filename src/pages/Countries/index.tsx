import React from 'react';

import { useQuery, gql } from '@apollo/client';

import { Container } from './styles';

import CountryCard from '../../components/CountryCard';

const COUNTRY_QUERY = gql`
  query {
    Country {
      name
      capital
      flag {
        svgFile
      }
    }
  }
`;

interface CountryResponse {
  Country: {
    name: string;
    capital: string;
    flag: {
      svgFile: string;
    };
  }[];
}

const Countries: React.FC = () => {
  const { loading, error, data } = useQuery<CountryResponse>(COUNTRY_QUERY);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!data?.Country) {
    return <p>Nenhum dado encontrado</p>;
  }

  return (
    <Container>
      {data.Country.map((country) => (
        <CountryCard
          key={country.name}
          name={country.name}
          capital={country.capital}
          flagUrl={country.flag.svgFile}
        />
      ))}
    </Container>
  );
};

export default Countries;
