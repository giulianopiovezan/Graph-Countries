import React, { useState, useEffect } from 'react';

import { useQuery } from '@apollo/client';

import { Container } from './styles';

import CountryCard from '../../components/CountryCard';

import { COUNTRIES_QUERY } from '../../queries/country';

interface Country {
  name: string;
  capital: string;
  flag: {
    svgFile: string;
  };
}

interface CountryResponse {
  Country: Country[];
}

const Countries: React.FC = () => {
  const [searchCountry, setSearchCountry] = useState('');
  const [countries, setCountries] = useState<Country[]>([]);
  const { loading, error, data } = useQuery<CountryResponse>(COUNTRIES_QUERY);

  useEffect(() => {
    if (data) {
      setCountries(data.Country);
    }
  }, [data]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!data) {
        return;
      }
      if (searchCountry) {
        setCountries([
          ...data?.Country.filter((country) =>
            country.name
              .toLocaleLowerCase()
              .includes(searchCountry.toLocaleLowerCase()),
          ),
        ]);
      } else {
        setCountries(data.Country);
      }
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [data, searchCountry]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!data?.Country) {
    return <p>Nenhum dado encontrado</p>;
  }

  return (
    <Container>
      <input
        type="text"
        placeholder="Pesquise um país"
        value={searchCountry}
        onChange={({ target }) => setSearchCountry(target.value)}
      />
      <main>
        {countries.map((country) => (
          <CountryCard
            key={country.name}
            name={country.name}
            capital={country.capital || 'Não informado'}
            flagUrl={country.flag.svgFile}
          />
        ))}
      </main>
    </Container>
  );
};

export default Countries;
