import React from 'react';

import { useParams, Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';

import { Container } from './styles';

import { COUNTRY_BY_NAME_QUERY } from '../../queries/country';

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
    local: {
      area?: number;
      population?: number;
      topLevelDomains?: {
        name: string;
      }[];
    };
  }[];
}

interface CountryQueryVariables {
  countryName: string;
}

interface RouteParam {
  countryName: string;
}

const CountryDetails: React.FC = () => {
  const { countryName } = useParams<RouteParam>();
  const { loading, error, data } = useQuery<
    CountryResponse,
    CountryQueryVariables
  >(COUNTRY_BY_NAME_QUERY, {
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
          {country.local?.area || country.area} <em>m2</em>
        </strong>
      </p>
      <p>
        <span>População:</span>
        <strong>{country.local?.population || country.population}</strong>
      </p>
      <div className="topLevelDomains">
        <span>Níveis de domínio</span>
        <ul>
          {(country.local?.topLevelDomains || country.topLevelDomains).map(
            (tpDomains) => (
              <li key={tpDomains.name}>{tpDomains.name}</li>
            ),
          )}
        </ul>
      </div>
      <Link to={`/countries/${country.name}/edit`}>Editar</Link>
    </Container>
  );
};

export default CountryDetails;
