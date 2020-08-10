import { gql } from '@apollo/client';

export const COUNTRY_BY_NAME_QUERY = gql`
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
      local @client {
        area
        population
        topLevelDomains {
          name
        }
      }
    }
  }
`;

export const COUNTRIES_QUERY = gql`
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
