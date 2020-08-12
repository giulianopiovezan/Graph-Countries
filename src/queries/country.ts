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
        emoji
      }
      location {
        latitude
        longitude
      }
      borders(first: 5) {
        name
        location {
          longitude
          latitude
        }
      }
      distanceToOtherCountries(first: 5) {
        distanceInKm
        countryName
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
