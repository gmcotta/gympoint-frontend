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
      const { data: response } = await api.get(`students/${id}`);
      setStudent(response);
    }
    loadStudents();
  }, [id]);

  const schema = Yup.object().shape({
    name: Yup.string().typeError('Please, type a valid value.'),
    email: Yup.string()
      .email()
      .typeError('Please, type a valid value.'),
    age: Yup.number()
      .integer()
      .typeError('Please, type a valid value.'),
    weight: Yup.number().typeError('Please, type a valid value.'),
    height: Yup.number().typeError('Please, type a valid value.'),
  });

  async function updateStudent(data) {
    try {
      await api.put(`students/${id}`, data);
      toast.success('The student has been updated!');
      history.push('/students');
    } catch (error) {
      toast.error('An error occurred. Please, try again later.');
    }
  }

  function goBack() {
    history.push('/students');
  }

  return (
    <Container>
      <Form
        schema={schema}
        initialData={student.student}
        onSubmit={updateStudent}
      >
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
