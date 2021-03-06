import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1260px;
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

export const ButtonArea = styled.div`
  display: flex;
`;

export const AddButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 36px;
  padding: 10px;
  margin-right: 16px;
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

export const SearchField = styled.form`
  display: flex;
  align-items: center;
  position: relative;

  svg {
    color: #999;
    position: absolute;
    left: 10px;
  }

  input {
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 16px 16px 16px 36px;
    max-height: 36px;
    color: #999;
  }
`;

export const TableContainer = styled.div`
  background-color: #fff;
  width: 100%;
  margin: 20px auto;
  border-radius: 4px;
  padding: 20px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    text-transform: uppercase;
    text-align: left;
  }

  td {
    color: #666;
    padding: 16px 0;
  }

  td#options {
    text-align: right;
  }

  tr.item {
    & + tr {
      border-top: 1px solid #eee;
    }
  }
`;

export const EditButton = styled.button`
  color: #4d85ee;
  margin-left: 25px;
  background: none;
  border: none;
`;

export const RemoveButton = styled.button`
  color: #de3b3b;
  margin-left: 25px;
  background: none;
  border: none;
`;

export const NoStudentArea = styled.div`
  background-color: #fff;
  width: 100%;
  margin: 20px auto;
  border-radius: 4px;
  padding: 20px;
  text-align: center;
  color: #999;
`;
