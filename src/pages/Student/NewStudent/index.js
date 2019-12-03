import React from 'react';
import { MdArrowBack, MdSave } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import {
  Container,
  FormHeader,
  FormContent,
  ButtonArea,
  BackButton,
  SaveButton,
  BodyInfo,
} from './styles';

export default function NewStudent() {
  function handleStudentData(data) {
    console.log(data);
  }
  return (
    <Container>
      <Form onSubmit={handleStudentData}>
        <FormHeader>
          <span>Add Student</span>
          <ButtonArea>
            <BackButton type="button" onClick={() => {}}>
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
          <span>Full name</span>
          <Input name="name" type="text" placeholder="John Doe" />
          <span>E-mail address</span>
          <Input name="email" type="email" placeholder="example@email.com" />
          <BodyInfo>
            <div>
              <span>Age</span>
              <Input name="age" type="number" />
            </div>
            <div>
              <span>Weight (in kg)</span>
              <Input name="weight" type="text" />
            </div>
            <div>
              <span>Height (in m)</span>
              <Input name="height" type="text" />
            </div>
          </BodyInfo>
        </FormContent>
      </Form>
    </Container>
  );
}
