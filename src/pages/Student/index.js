import React from 'react';
import { MdAdd, MdSearch } from 'react-icons/md';
import api from '~/services/api';
import {
  Container,
  TableHeader,
  ButtonArea,
  AddButton,
  SearchField,
} from './styles';

// import { Container } from './styles';

export default function Student() {
  return (
    <Container>
      <TableHeader>
        <span>Managing Students</span>
        <ButtonArea>
          <AddButton>
            <MdAdd size={16} />
            <span>Add</span>
          </AddButton>
          <SearchField>
            <MdSearch size={16} />
            <input placeholder="Find student" />
          </SearchField>
        </ButtonArea>
      </TableHeader>
    </Container>
  );
}
