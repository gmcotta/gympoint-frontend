import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Content } from './styles';

import logo from '~/assets/header_logo.png';
import { signOut } from '~/store/modules/auth/actions';

export default function Header() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.admin.profile);

  const splitURL = document.URL.split('/');

  function handleLogout() {
    dispatch(signOut());
  }
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="Gympoint Header Logo" />
          <div>
            <Link
              className={splitURL.includes('students') ? 'selected' : ''}
              to="/students"
            >
              Students
            </Link>
            <Link
              className={splitURL.includes('plans') ? 'selected' : ''}
              to="/plans"
            >
              Plans
            </Link>
            <Link
              className={splitURL.includes('enrollments') ? 'selected' : ''}
              to="/enrollments"
            >
              Enrollments
            </Link>
            <Link
              className={splitURL.includes('help-orders') ? 'selected' : ''}
              to="/help-orders"
            >
              Help Orders
            </Link>
          </div>
        </nav>
        <aside>
          <strong>{profile.name}</strong>
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </aside>
      </Content>
    </Container>
  );
}
