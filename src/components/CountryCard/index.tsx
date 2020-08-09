import React from 'react';

import { Link } from 'react-router-dom';

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
      <div>
        <h1>{name}</h1>
        <p>
          <strong>Capital: </strong>
          <span>{capital}</span>
        </p>
        <Link to={`/countries/${name}`}>ver detalhes</Link>
      </div>
    </Container>
  );
};

export default CountryCard;
