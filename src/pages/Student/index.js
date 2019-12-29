import React, { useState, useEffect } from 'react';
import { MdAdd, MdSearch } from 'react-icons/md';
import { toast } from 'react-toastify';
import api from '~/services/api';
import history from '~/services/history';
import Pagination from '~/components/Pagination';
import { pageOptions } from '~/components/pageOptions';
import {
  Container,
  TableHeader,
  ButtonArea,
  AddButton,
  SearchField,
  TableContainer,
  Table,
  EditButton,
  RemoveButton,
  NoStudentArea,
} from './styles';

export default function Student() {
  const defaultPageOption = pageOptions[0];
  const [perPage, setPerPage] = useState(defaultPageOption.value);
  const [page, setPage] = useState(1);
  const [name, setName] = useState('');
  const [allItems, setAllItems] = useState();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function loadStudents() {
      const { data: allStudents } = await api.get('students', {
        params: { name },
      });
      setAllItems(allStudents.length);

      const { data: response } = await api.get('students', {
        params: { name, page, perPage },
      });
      setStudents(response);
    }
    loadStudents();
  }, [name, page, perPage]);

  function handleAddStudent() {
    history.push('students/new');
  }

  function handleStudentName(e) {
    setName(e.target.value);
    setPage(1);
  }

  function handleStudentEdit(id) {
    history.push(`students/${id}`);
  }

  async function handleStudentRemove(student_id) {
    if (window.confirm('Are you sure you wanna remove this student?')) {
      try {
        await api.delete(`students/${student_id}`);
        const newStudents = students.filter(
          student => student.id !== student_id
        );
        setStudents(newStudents);
        toast.success('Student removed successfully.');
      } catch (error) {
        toast.error('An error occurred. Plase, try again later.');
        console.tron.log(error);
      }
    }
  }

  function handleNextPage() {
    setPage(page + 1);
  }

  function handlePrevPage() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  function handlePageOption(e) {
    setPerPage(e.value);
    setPage(1);
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
          <SearchField>
            <MdSearch size={16} />
            <input
              type="text"
              placeholder="Find student"
              onChange={handleStudentName}
            />
          </SearchField>
        </ButtonArea>
      </TableHeader>
      <Pagination
        prevButtonDisabled={page === 1}
        handlePrevPage={handlePrevPage}
        page={page}
        nextButtonDisabled={
          students.length < perPage || page * students.length === allItems
        }
        handleNextPage={handleNextPage}
        defaultPageOption={defaultPageOption}
        pageOptions={pageOptions}
        handlePageOption={handlePageOption}
      />

      {students.length ? (
        <TableContainer>
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
              {students.map(student => (
                <tr className="item" key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.age}</td>
                  <td id="options">
                    <EditButton
                      type="button"
                      onClick={() => handleStudentEdit(student.id)}
                    >
                      edit
                    </EditButton>
                    <RemoveButton
                      type="button"
                      onClick={() => {
                        handleStudentRemove(student.id);
                      }}
                    >
                      remove
                    </RemoveButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      ) : (
        <NoStudentArea>
          <h1>No students found</h1>
        </NoStudentArea>
      )}
    </Container>
  );
}
