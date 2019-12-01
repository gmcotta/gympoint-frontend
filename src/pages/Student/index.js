import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdAdd, MdSearch } from 'react-icons/md';
import api from '~/services/api';
import history from '~/services/history';
import {
  Container,
  TableHeader,
  ButtonArea,
  AddButton,
  SearchField,
  Table,
} from './styles';

export default function Student() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get('students', {
        params: { name },
      });
      const studentsData = response.data;
      setStudents(studentsData);
      console.log(studentsData);
    }
    loadStudents();
  }, [name]);

  function handleAddStudent() {
    alert('Add student');
  }

  function handleStudentName(e) {
    setName(e.target.value);
  }

  function handleFindStudent(e) {
    e.preventDefault();
    alert(name);
  }

  function handleStudentEdit(id) {
    console.log(`Edit student ${id}`);
    history.push(`students/${id}`);
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
            <input
              type="text"
              placeholder="Find student"
              onChange={handleStudentName}
            />
          </SearchField>
        </ButtonArea>
      </TableHeader>

      {students.length ? (
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
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.age}</td>
                <td id="options">
                  <Link to="/">edit</Link>
                  <button type="button" onClick={() => {}}>
                    remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div>
          <h1>No students found</h1>
        </div>
      )}
    </Container>
  );
}
