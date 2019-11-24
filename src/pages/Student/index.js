import React from 'react';
import api from '~/services/api';

// import { Container } from './styles';

export default function Student() {
  api.get('plans');
  return <h1>Student</h1>;
}
