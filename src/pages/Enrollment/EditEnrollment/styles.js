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
    margin: 15px 0 8px;
  }

  span {
    color: #ee4d64;
    max-width: 180px;
  }

  .studentPicker__control {
    height: 45px;
    border-color: #ddd;
  }

  .planPicker__control {
    height: 45px;
    width: 200px;
    border-color: #ddd;
  }

  .planPicker__placeholder {
    position: relative;
    top: 5px;
  }

  .planPicker__indicators {
    position: relative;
    top: -2px;
  }
`;

export const EnrollmentInfo = styled.div`
  display: flex;
  justify-content: space-between;

  section {
    display: flex;
    flex-direction: column;

    input {
      height: 45px;
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 15px;
    }

    input.disabled {
      background-color: #f5f5f5;
      color: #999;
    }
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
