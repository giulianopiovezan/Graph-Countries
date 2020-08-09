import styled from 'styled-components';

export const Container = styled.section`
  padding: 7px 14px;

  main {
    display: flex;
    justify-content: space-evenly;
    flex-flow: row wrap;
  }

  > input {
    width: 100%;
    margin: 0;
    padding: 10px;
    border-radius: 8px;
    background: transparent;
    border: none;
    border: 1px solid #dadada;
    font-size: 32px;
  }
`;
