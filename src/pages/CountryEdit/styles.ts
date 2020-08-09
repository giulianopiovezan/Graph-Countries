import styled from 'styled-components';

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  background: #fff;
  border-radius: 8px;
  margin: 10px;
  box-shadow: 2px 1px 4px rgba(0, 0, 0, 0.1);

  img {
    border-radius: 8px;
    margin-bottom: 10px;
    max-width: 500px;

    @media only screen and (max-width: 500px) {
      width: calc(100% - 20px);
    }
  }

  > button {
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    background: #1976d2;
    color: #fff;
    width: 100%;
    margin-top: 15px;
    font-weight: 600;

    &:hover {
      background: #1976d2cf;
    }
  }

  .form-group {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 8px;
  }

  label {
    width: 100%;
    display: flex;
    flex-direction: column;
    line-height: 24px;
    font-size: 18px;
  }

  input {
    margin-top: 4px;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid #dadada;
    font-size: 16px;
    width: 100%;
  }

  fieldset {
    width: 100%;
    padding: 20px;
    border: 1px solid #dadada;
    border-radius: 4px;

    @media only screen and (max-width: 500px) {
      text-align: center;
    }

    div {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      @media only screen and (max-width: 500px) {
        flex-direction: column;
      }

      button {
        box-sizing: border-box;
        margin-left: 5px;
        border: none;
        padding: 8px;
        border-radius: 4px;
        background: #4caf50;
        color: #fff;
        font-weight: 600;

        &:hover {
          background: #4caf50d6;
        }

        @media only screen and (max-width: 500px) {
          margin-top: 5px;
        }
      }
    }

    legend {
      font-size: 18px;
    }

    ul {
      list-style: none;
      margin-top: 10px;
      width: 100%;

      li {
        button {
          margin-left: 5px;
          width: 80px;
          border: none;
          padding: 1px;
          border-radius: 4px;
          background: #f44336;
          color: #fff;
          font-weight: 600;

          &:hover {
            background: #f44336cf;
          }
        }

        & + li {
          margin-top: 5px;
        }
      }
    }
  }
`;
