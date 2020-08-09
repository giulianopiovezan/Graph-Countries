import { makeVar } from '@apollo/client';

interface Coutries {
  name: string;
  capital: string;
  area: number;
  population: number;
  topLevelDomains: {
    name: string;
  }[];
}

export const countriesVar = makeVar<Coutries[]>([
  {
    name: 'Brazil',
    capital: 'Brasilia',
    area: 1,
    population: 2,
    topLevelDomains: [{ name: 'teste' }],
  },
]);
