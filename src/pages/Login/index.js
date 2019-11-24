import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import logo from '~/assets/logo.png';
import { Container } from './styles';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Type a valid e-mail')
    .required('E-mail is required'),
  password: Yup.string().required('Password is required'),
});

export default function Login() {
  function handleSubmit(data) {
    console.tron.log(data);
  }

  return (
    <Container>
      <img src={logo} alt="Gympoint" align="middle" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <span id="field_title">Your e-mail</span>
        <Input name="email" type="email" placeholder="example@email.com" />
        <span id="field_title">Your password</span>
        <Input name="password" type="password" />
        <button type="submit">Login</button>
      </Form>
    </Container>
  );
}
