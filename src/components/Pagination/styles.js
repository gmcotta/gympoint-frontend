import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  .perPagePicker__control {
    height: 40px;
    width: 200px;
    border-color: #ddd;
  }
`;

export const PageButtonArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    margin: 0 10px;
    font-weight: bold;
    background-color: #fff;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
`;

export const PageButton = styled.button`
  background-color: #de3b3b;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  padding: 10px;
  border-radius: 4px;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
`;
