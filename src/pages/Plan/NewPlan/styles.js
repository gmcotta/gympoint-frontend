import styled from 'styled-components';

export const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 0 30px;
`;

export const FormHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;

  span {
    font-size: 24px;
    font-weight: bold;
    color: #444;
  }
`;

export const FormContent = styled.div`
  background-color: #fff;
  width: 100%;
  margin: 20px auto;
  border-radius: 4px;
  padding: 15px 30px 30px;
  display: flex;
  flex-direction: column;

  strong {
    text-transform: uppercase;
    font-weight: bold;
    margin-top: 15px;
  }

  span {
    color: #ee4d64;
  }

  input {
    height: 45px;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 15px;
    margin: 8px 0px;

    &::placeholder {
      color: #999;
    }
  }
`;

export const PlanInfo = styled.div`
  display: flex;
  justify-content: space-between;

  div {
    display: flex;
    flex-direction: column;
  }

  input {
    width: 270px;
    border: 1px solid #ddd;
  }

  input.disabled {
    background-color: #f5f5f5;
    color: #999;
  }
`;

export const ButtonArea = styled.div`
  display: flex;
`;

export const BackButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 36px;
  padding: 10px;
  margin-right: 16px;
  border: none;
  border-radius: 4px;
  background-color: #ddd;
  color: #fff;

  span {
    font-size: 14px;
    font-weight: bold;
    color: #fff;
    text-transform: uppercase;
    margin-left: 7px;
  }
`;

export const SaveButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 36px;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #ee4d64;
  color: #fff;

  span {
    font-size: 14px;
    font-weight: bold;
    color: #fff;
    text-transform: uppercase;
    margin-left: 7px;
  }
`;
