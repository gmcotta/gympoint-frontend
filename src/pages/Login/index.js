import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import logo from '~/assets/logo.png';
import { Container } from './styles';
import { signInRequest } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Type a valid e-mail')
    .required('E-mail is required'),
  password: Yup.string().required('Password is required'),
});

export default function Login() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <Container>
      <img src={logo} alt="Gympoint" align="middle" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <span id="field_title">Your e-mail</span>
        <Input name="email" type="email" placeholder="example@email.com" />
        <span id="field_title">Your password</span>
        <Input name="password" type="password" />
        <button type="submit">{loading ? 'Loading...' : 'Login'}</button>
      </Form>
    </Container>
  );
}
