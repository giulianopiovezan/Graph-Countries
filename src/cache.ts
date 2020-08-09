import { makeVar } from '@apollo/client';

export interface CoutriesData {
  name: string;
  capital: string;
  area: number;
  population: number;
  topLevelDomains: {
    name: string;
  }[];
}

export const countriesVar = makeVar<CoutriesData[]>([]);
