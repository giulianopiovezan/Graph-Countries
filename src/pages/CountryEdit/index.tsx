/* eslint-disable no-alert */
import React, { useState, useCallback, useEffect } from 'react';

import { useQuery } from '@apollo/client';

import { useParams, useHistory } from 'react-router-dom';

import { Container } from './styles';

import { COUNTRY_BY_NAME_QUERY } from '../../queries/country';
import { countriesVar } from '../../cache';

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

const CountryEdit: React.FC = () => {
  const { countryName } = useParams<RouteParam>();
  const history = useHistory();
  const localCountries = countriesVar();
  const [topLevelDomains, setTopLevelDomains] = useState<{ name: string }[]>(
    [],
  );

  const { loading, error, data } = useQuery<
    CountryResponse,
    CountryQueryVariables
  >(COUNTRY_BY_NAME_QUERY, {
    variables: { countryName },
  });

  const [area, setArea] = useState(0);
  const [population, setPopulation] = useState(0);
  const [topLevelDomain, setTopLevelDomain] = useState('');

  useEffect(() => {
    if (data) {
      const [country] = data.Country;
      setArea(country.local?.area || country.area);
      setPopulation(country.local?.population || country.population);
      setTopLevelDomains(
        country.local?.topLevelDomains || country.topLevelDomains,
      );
    }
  }, [data]);

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();

      if (!data) {
        return;
      }

      const [country] = data.Country;

      countriesVar([
        ...localCountries.filter(
          (localCountry) => localCountry.name !== country.name,
        ),
        { ...country, area, population, topLevelDomains },
      ]);

      alert('Atualizado com sucesso');

      history.push('/countries');
    },
    [area, data, history, localCountries, population, topLevelDomains],
  );

  const handleAddTopLevelDomain = useCallback(() => {
    if (topLevelDomain) {
      if (
        topLevelDomains.some(
          (findTopLevel) => findTopLevel.name === topLevelDomain,
        )
      ) {
        alert('Nivel de dominio ja existe');
        return;
      }
      setTopLevelDomains((state) => [...state, { name: topLevelDomain }]);
      setTopLevelDomain('');
    }
  }, [topLevelDomain, topLevelDomains]);

  const handleRemoveTopLevelDomain = useCallback((name: string) => {
    setTopLevelDomains((state) => [
      ...state.filter((findState) => findState.name !== name),
    ]);
  }, []);

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
    <Container onSubmit={handleSubmit}>
      <img alt="flag" src={country.flag.svgFile} />

      <div className="form-group">
        <label htmlFor="area">
          Area
          <input
            id="area"
            type="number"
            name="area"
            value={area}
            onChange={({ target }) => setArea(Number(target.value))}
          />
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="population">
          Populacao
          <input
            id="population"
            type="number"
            name="population"
            value={population}
            onChange={({ target }) => setPopulation(Number(target.value))}
          />
        </label>
      </div>
      <fieldset>
        <legend>Niveis de dominio</legend>
        <div>
          <input
            id="topLevelDomain"
            type="text"
            name="topLevelDomain"
            value={topLevelDomain}
            onChange={({ target }) => setTopLevelDomain(target.value)}
            placeholder="Adicionar nivel de dominio"
          />
          <button type="button" onClick={handleAddTopLevelDomain}>
            Adicionar
          </button>
        </div>

        <ul>
          {topLevelDomains.map((domain) => (
            <li key={domain.name}>
              <span>{domain.name}</span>
              <button
                type="button"
                onClick={() => handleRemoveTopLevelDomain(domain.name)}
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
      </fieldset>
      <button type="submit">SALVAR</button>
    </Container>
  );
};

export default CountryEdit;
