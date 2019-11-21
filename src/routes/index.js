import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Login from '../pages/Login';
import Student from '../pages/Student';
import Plan from '../pages/Plan';
import Enrollment from '../pages/Enrollment';
import HelpOrder from '../pages/HelpOrder';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/students" exact component={Student} isPrivate />
      <Route path="/plans" exact component={Plan} isPrivate />
      <Route path="/enrollments" exact component={Enrollment} isPrivate />
      <Route path="/help-orders" exact component={HelpOrder} isPrivate />
      <Route path="/" component={() => <h1>404</h1>} />
    </Switch>
  );
}
