import React from 'react';

import { useParams, Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';

import { TileLayer, Marker, Popup } from 'react-leaflet';

import { Icon } from 'leaflet';

import { Container, Content, MapContainer } from './styles';

import { COUNTRY_BY_NAME_QUERY } from '../../queries/country';

import customMarkerImg from '../../assets/customMarker.svg';

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
      emoji: string;
    };
    location: {
      latitude: number;
      longitude: number;
    };
    borders: {
      name: string;
      location: {
        longitude: number;
        latitude: number;
      };
    }[];
    distanceToOtherCountries: {
      distanceInKm: number;
      countryName: string;
    }[];
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

  const pointerIcon = new Icon({
    iconUrl: customMarkerImg,
    iconRetinaUrl: customMarkerImg,
    iconAnchor: [5, 55],
    popupAnchor: [10, -44],
    iconSize: [35, 55],
    shadowSize: [68, 95],
    shadowAnchor: [20, 92],
  });

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>Ocorreu um erro ao carregar as informações do país</p>;
  }

  if (!data?.Country.length) {
    return <p>País não encontrado</p>;
  }

  const [country] = data.Country;

  return (
    <Container>
      <Content>
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
      </Content>
      <MapContainer
        center={[country.location.latitude, country.location.longitude]}
        zoom={3}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker
          position={[country.location.latitude, country.location.longitude]}
          icon={pointerIcon}
        >
          <Popup
            position={[country.location.latitude, country.location.longitude]}
          >
            <ul>
              <li>
                <b>5 países mais próximos</b>
              </li>
              {country.distanceToOtherCountries.map((distance) => (
                <li key={distance.countryName}>
                  {distance.countryName} - {distance.distanceInKm.toFixed(2)} km
                </li>
              ))}
            </ul>
          </Popup>
        </Marker>

        {country.borders.map((border) => (
          <Marker
            key={border.name}
            position={[border.location.latitude, border.location.longitude]}
          >
            <Popup>{border.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </Container>
  );
};

export default CountryDetails;
