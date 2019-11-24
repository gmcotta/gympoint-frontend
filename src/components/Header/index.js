import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Content } from './styles';

import logo from '~/assets/header_logo.png';

export default function Header() {
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="Gympoint Header Logo" />
          <div>
            <Link to="/students">Students</Link>
            <Link to="/plans">Plans</Link>
            <Link to="/enrollments">Enrollments</Link>
            <Link to="/help-orders">Help Orders</Link>
          </div>
        </nav>
        <aside>
          <strong>Admin</strong>
          <Link to="/logout">Logout</Link>
        </aside>
      </Content>
    </Container>
  );
}
