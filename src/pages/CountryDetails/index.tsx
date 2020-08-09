import React from 'react';

import { useParams, Link } from 'react-router-dom';

import { useQuery, gql } from '@apollo/client';

import { Container } from './styles';

const COUNTRY_QUERY = gql`
  query getCountry($countryName: String!) {
    Country(name: $countryName) {
      name
      capital
      area
      population
      topLevelDomains {
        name
      }
      flag {
        svgFile
      }
      local @client
    }
  }
`;

interface CountryResponse {
  Country: {
    name: string;
    capital: string;
    area: number;
    population: number;
    topLevelDomains: {
      name: string;
    }[];
    flag: {
      svgFile: string;
    };
  }[];
}

interface RouteParam {
  countryName: string;
}

const CountryDetails: React.FC = () => {
  const { countryName } = useParams<RouteParam>();
  const { loading, error, data } = useQuery<CountryResponse>(COUNTRY_QUERY, {
    variables: { countryName },
  });

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>Ocorreu um erro ao carregar os dados</p>;
  }

  if (!data?.Country) {
    return <p>Nenhum dado encontrado</p>;
  }

  const [country] = data.Country;

  return (
    <Container>
      <img alt="flag" src={country.flag.svgFile} />
      <p>
        <span>País:</span>
        <strong>{country.name}</strong>
      </p>
      <p>
        <span>Capital:</span>
        <strong>{country.capital}</strong>
      </p>
      <p>
        <span>Área:</span>
        <strong>
          {country.area} <em>m2</em>
        </strong>
      </p>
      <p>
        <span>População:</span>
        <strong>{country.population}</strong>
      </p>
      <div className="topLevelDomains">
        <span>Níveis de domínio</span>
        <ul>
          {country.topLevelDomains.map((tpDomains) => (
            <li key={tpDomains.name}>{tpDomains.name}</li>
          ))}
        </ul>
      </div>
      <Link to={`/countries/${country.name}/edit`}>Editar</Link>
    </Container>
  );
};

export default CountryDetails;
