import styled from 'styled-components';
import { Form } from '@rocketseat/unform';

export const Container = styled.div`
  max-width: 760px;
  margin: 0 auto;
  padding: 0 30px;
`;

export const TableHeader = styled.header`
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

export const ListArea = styled.ul`
  background-color: #fff;
  width: 100%;
  margin: 20px auto;
  border-radius: 4px;
  padding: 20px;

  strong {
    text-transform: uppercase;
    text-align: left;
  }

  li {
    padding: 16px 0;
    display: flex;
    justify-content: space-between;

    & + li {
      border-top: 1px solid #eee;
    }
  }
`;

export const ViewButton = styled.button`
  color: #4d85ee;
  margin-left: 25px;
  background: none;
  border: none;
`;

export const NoHelpOrderArea = styled.div`
  background-color: #fff;
  width: 100%;
  margin: 20px auto;
  border-radius: 4px;
  padding: 20px;
  text-align: center;
  color: #999;
`;

export const ModalBody = styled(Form)`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  padding: 30px;

  p {
    margin-bottom: 8px;
  }

  strong {
    margin-bottom: 8px;
  }

  textarea {
    height: 120px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 20px;
    padding: 15px;
    font-size: 12px;
  }
`;

export const ReplyButton = styled.button`
  width: 100%;
  color: #fff;
  background-color: #ee4d64;
  padding: 13px;
  border: none;
  border-radius: 4px;
`;

export const Pagination = styled.div`
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
    background-color: #f5f5f5;
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
