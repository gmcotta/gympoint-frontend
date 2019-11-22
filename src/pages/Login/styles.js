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

    span {
      text-align: left;
      text-transform: uppercase;
      font-weight: bold;
      margin-bottom: 8px;
    }

    input {
      height: 45px;
      padding: 14px;
      border: 1px solid #ddd;
      margin-bottom: 20px;

      &::placeholder {
        color: #999;
      }
    }

    button {
      background: #ee4d64;
      border: 0;
      border-radius: 4px;
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
