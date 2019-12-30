import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: #fff;
  text-align: center;
  max-width: 360px;
  width: 100%;
  padding: 50px 30px;
  border-radius: 4px;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    span#field_title {
      color: #000;
      text-align: left;
      text-transform: uppercase;
      font-weight: bold;
      margin: 20px 0 8px 0;
    }

    span {
      color: #ee4d64;
      text-align: left;
      margin: 5px 0;
    }

    input {
      height: 45px;
      padding: 14px;
      border: 1px solid #ddd;
      border-radius: 4px;

      &::placeholder {
        color: #999;
      }
    }

    button {
      background: #ee4d64;
      border: 0;
      border-radius: 4px;
      margin-top: 15px;
      padding: 14px;
      color: #fff;
      font-weight: bold;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.05, '#ee4d64')};
      }
    }
  }
`;
