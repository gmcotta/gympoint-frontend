import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import logo from '~/assets/logo.png';
import { Container } from './styles';

export default function Login() {
  function handleSubmit(data) {
    console.tron.log(data);
  }

  return (
    <Container>
      <img src={logo} alt="Gympoint" align="middle" />
      <Form onSubmit={handleSubmit}>
        <span>Your e-mail</span>
        <Input name="email" type="email" placeholder="example@email.com" />
        <span>Your password</span>
        <Input name="password" type="password" />
        <button type="submit">Login</button>
      </Form>
    </Container>
  );
}
