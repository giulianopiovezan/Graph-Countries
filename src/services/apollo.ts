import { ApolloClient, InMemoryCache } from '@apollo/client';

import { countriesVar } from '../cache';

const client = new ApolloClient({
  uri: 'https://countries-274616.ew.r.appspot.com',
  cache: new InMemoryCache({
    typePolicies: {
      Country: {
        fields: {
          local: {
            read(_, { variables }) {
              const coutries = countriesVar();

              if (variables) {
                const foundCountry = coutries.find(
                  (country) => country.name === variables.countryName,
                );

                return foundCountry || {};
              }

              return {};
            },
          },
        },
      },
    },
  }),
});

export default client;
