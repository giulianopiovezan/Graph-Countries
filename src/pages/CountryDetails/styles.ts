import styled from 'styled-components';
import { Map } from 'react-leaflet';

export const Container = styled.section`
  padding: 7px 14px;
  margin: 10px;
  display: flex;
  background: #fff;
  border-radius: 8px;
  box-shadow: 2px 1px 4px rgba(0, 0, 0, 0.1);

  @media only screen and (max-width: 1024px) {
    flex-direction: column;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 40px;

  img {
    border-radius: 8px;
    margin-bottom: 10px;
    max-width: 500px;

    @media only screen and (max-width: 500px) {
      width: calc(100% - 20px);
    }
  }

  p {
    line-height: 28px;

    span {
      font-size: 20px;
      margin-right: 5px;
      color: #6d6d71;
    }

    strong {
      font-size: 20px;
      font-weight: 500;

      em {
        font-size: 16px;
      }
    }
  }

  .topLevelDomains {
    text-align: center;

    span {
      font-size: 20px;
      margin-right: 5px;
      color: #6d6d71;
    }

    ul {
      list-style: none;
      display: inline;

      li + li {
        margin-right: 5px;
      }
    }
  }

  a {
    margin-top: 10px;
    text-decoration: none;
    padding: 5px 10px;
    width: 100px;
    color: #fff;
    border: 1px solid #dadada;
    border-radius: 4px;
    background: #4caf50;
    text-align: center;
    margin-top: 10px;

    &:hover {
      background: #4caf50d6;
    }
  }
`;

export const MapContainer = styled(Map)`
  width: 100%;
  height: 600px;
  border-radius: 4px;
  padding: 0;
  margin: 10px;

  ul {
    list-style: none;
  }
`;
