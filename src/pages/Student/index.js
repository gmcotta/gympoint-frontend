import React from 'react';
import { Link } from 'react-router-dom';
import { MdAdd, MdSearch } from 'react-icons/md';
import api from '~/services/api';
import {
  Container,
  TableHeader,
  ButtonArea,
  AddButton,
  SearchField,
  Table,
} from './styles';

export default function Student() {
  function handleAddStudent() {
    alert('Add student');
  }

  function handleFindStudent() {
    alert('Find student');
  }

  return (
    <Container>
      <TableHeader>
        <span>Managing Students</span>
        <ButtonArea>
          <AddButton onClick={handleAddStudent}>
            <MdAdd size={16} />
            <span>Add</span>
          </AddButton>
          <SearchField onSubmit={handleFindStudent}>
            <MdSearch size={16} />
            <input placeholder="Find student" />
          </SearchField>
        </ButtonArea>
      </TableHeader>

      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>E-mail</th>
            <th>Age</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Darius Cummings</td>
            <td>example@rocketseat.com.br</td>
            <td>18</td>
            <td id="options">
              <Link to="/">edit</Link>
              <button type="button" onClick={() => {}}>
                remove
              </button>
            </td>
          </tr>
          <tr>
            <td>Darius Cummings</td>
            <td>example@rocketseat.com.br</td>
            <td>18</td>
            <td id="options">
              <Link to="/">edit</Link>
              <button type="button" onClick={() => {}}>
                remove
              </button>
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}
