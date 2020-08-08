import React from 'react';

import { Container } from './styles';

interface CountryCardProps {
  name: string;
  capital: string;
  flagUrl: string;
}

const CountryCard: React.FC<CountryCardProps> = ({
  name,
  capital,
  flagUrl,
}) => {
  return (
    <Container>
      <img alt="country" src={flagUrl} />
      <section>
        <h1>{name}</h1>
        <p>
          <strong>Capital: </strong>
          <span>{capital}</span>
        </p>
        <a href="/details">ver detalhes</a>
      </section>
    </Container>
  );
};

export default CountryCard;
