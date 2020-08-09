import styled from 'styled-components';

export const Container = styled.article`
  width: 300px;
  display: flex;
  flex-direction: column;
  border: 1px solid #dadada;
  border-radius: 8px;
  box-shadow: 2px 1px 4px rgba(0, 0, 0, 0.1);
  margin: 20px;
  background: #fff;

  div {
    padding: 10px;
    text-align: center;
    position: relative;
    height: 100%;

    h1 {
      font-size: 22px;
      color: #6d6d71;
      margin-bottom: 5px;
    }

    p {
      margin-bottom: 30px;

      strong {
        font-size: 14px;
      }
    }

    a {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      margin-left: auto;
      margin-right: auto;

      padding: 5px;
      text-decoration: none;
      color: #6d6d71;

      &:hover {
        color: #6d6d71ab;
      }
    }
  }

  img {
    width: inherit;
    height: 150px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    border-bottom: 1px solid #dadada;
  }
`;
