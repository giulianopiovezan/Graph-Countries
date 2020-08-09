import styled from 'styled-components';

export const Container = styled.section`
  margin: 10px;
  padding: 7px 14px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 4px;

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
    span {
      font-size: 20px;
      margin-right: 5px;
      color: #6d6d71;
    }

    ul {
      list-style: none;
      display: inline-block;

      li + li {
        margin-right: 5px;
      }
    }
  }

  a {
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
