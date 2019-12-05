import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MdArrowBack, MdSave } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import {
  Container,
  FormHeader,
  FormContent,
  ButtonArea,
  BackButton,
  SaveButton,
  BodyInfo,
} from './styles';
import api from '~/services/api';
import history from '~/services/history';

export default function EditStudent() {
  const [student, setStudent] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get('students');
      const studentsData = response.data;
      console.log(studentsData);
      const currentStudent = studentsData.find(s => s.id === Number(id));
      console.log(currentStudent);

      setStudent(currentStudent);
    }
    loadStudents();
  }, [id]);

  const schema = Yup.object().shape({
    name: Yup.string(),
    email: Yup.string().email(),
    age: Yup.number().integer(),
    weight: Yup.number(),
    height: Yup.number(),
  });

  async function updateStudent(data) {
    try {
      await api.put(`students/${id}`, data);
      toast.success('The student has been updated!');
      history.push('/');
    } catch (error) {
      console.tron.log(error);
      toast.error(error);
    }
    console.tron.log(data);
  }

  function goBack() {
    history.push('/');
  }

  return (
    <Container>
      <Form schema={schema} initialData={student} onSubmit={updateStudent}>
        <FormHeader>
          <span>Edit Student</span>
          <ButtonArea>
            <BackButton type="button" onClick={goBack}>
              <MdArrowBack size={16} />
              <span>Back</span>
            </BackButton>
            <SaveButton type="submit">
              <MdSave size={16} />
              <span>Save</span>
            </SaveButton>
          </ButtonArea>
        </FormHeader>
        <FormContent>
          <strong>Full name</strong>
          <Input name="name" type="text" placeholder="John Doe" />
          <strong>E-mail address</strong>
          <Input name="email" type="email" placeholder="example@email.com" />
          <BodyInfo>
            <div>
              <strong>Age</strong>
              <Input name="age" type="number" />
            </div>
            <div>
              <strong>Weight (in kg)</strong>
              <Input name="weight" type="text" />
            </div>
            <div>
              <strong>Height (in m)</strong>
              <Input name="height" type="text" />
            </div>
          </BodyInfo>
        </FormContent>
      </Form>
    </Container>
  );
}
