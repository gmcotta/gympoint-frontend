import React from 'react';
import logo from '~/assets/logo.png';
import { Container } from './styles';

export default function Login() {
  return (
    <Container>
      <img src={logo} alt="Gympoint" align="middle" />
      <form>
        <span>Your e-mail</span>
        <input type="email" placeholder="example@email.com" />
        <span>Your password</span>
        <input type="password" />
        <button type="submit">Login</button>
      </form>
    </Container>
  );
}
