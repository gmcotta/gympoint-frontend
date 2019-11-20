import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Student from '../pages/Student';
import Plan from '../pages/Plan';
import Enrollment from '../pages/Enrollment';
import HelpOrder from '../pages/HelpOrder';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/students" exact component={Student} />
      <Route path="/plans" exact component={Plan} />
      <Route path="/enrollments" exact component={Enrollment} />
      <Route path="/help-orders" exact component={HelpOrder} />
    </Switch>
  );
}
