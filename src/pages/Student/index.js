import React, { useState, useEffect } from 'react';
import { MdAdd, MdSearch } from 'react-icons/md';
import { toast } from 'react-toastify';
import api from '~/services/api';
import history from '~/services/history';
import {
  Container,
  TableHeader,
  ButtonArea,
  AddButton,
  SearchField,
  Table,
  Edit,
  Remove,
  NoStudentArea,
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
      console.tron.log(studentsData);
    }
    loadStudents();
  }, [name]);

  function handleAddStudent() {
    history.push('students/new');
  }

  function handleStudentName(e) {
    setName(e.target.value);
  }

  function handleStudentEdit(id) {
    // console.log(`Edit student ${id}`);
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
        // console.log(studentsData);
      } catch (error) {
        toast.error('An error occurred. Plase, try again later.');
        console.tron.log(error);
      }
    }
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
                  <Edit
                    type="button"
                    onClick={() => handleStudentEdit(student.id)}
                  >
                    edit
                  </Edit>
                  <Remove
                    type="button"
                    onClick={() => {
                      handleStudentRemove(student.id);
                    }}
                  >
                    remove
                  </Remove>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <NoStudentArea>
          <h1>No students found</h1>
        </NoStudentArea>
      )}
    </Container>
  );
}
