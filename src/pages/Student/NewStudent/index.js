import React from 'react';
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

export default function NewStudent() {
  const schema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .email()
      .required('Email is required'),
    age: Yup.number()
      .integer()
      .required('Age is required')
      .typeError('Age is required'),
    weight: Yup.number('Weight is required')
      .required('Weight is required')
      .typeError('Weight is required'),
    height: Yup.number('Height is required')
      .required('Height is required')
      .typeError('Height is required'),
  });

  async function insertStudent(data) {
    try {
      await api.post('students', data);
      toast.success('A new student has been added!');
      history.push('/students');
    } catch (error) {
      console.tron.log(error);
      toast.error(error);
    }
    console.tron.log(data);
  }

  function goBack() {
    history.push('/students');
  }

  return (
    <Container>
      <Form schema={schema} onSubmit={insertStudent}>
        <FormHeader>
          <span>Add Student</span>
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
