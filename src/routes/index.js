import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Login from '~/pages/Login';

import Student from '~/pages/Student';
import NewStudent from '~/pages/Student/NewStudent';
import EditStudent from '~/pages/Student/EditStudent';

import Plan from '~/pages/Plan';
import NewPlan from '~/pages/Plan/NewPlan';
import EditPlan from '~/pages/Plan/EditPlan';

import Enrollment from '~/pages/Enrollment';
import NewEnrollment from '~/pages/Enrollment/NewEnrollment';
import EditEnrollment from '~/pages/Enrollment/EditEnrollment';

import HelpOrder from '~/pages/HelpOrder';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />

      <Route path="/students" exact component={Student} isPrivate />
      <Route path="/students/new" exact component={NewStudent} isPrivate />
      <Route path="/students/:id" exact component={EditStudent} isPrivate />

      <Route path="/plans" exact component={Plan} isPrivate />
      <Route path="/plans/new" exact component={NewPlan} isPrivate />
      <Route path="/plans/:id" exact component={EditPlan} isPrivate />

      <Route path="/enrollments" exact component={Enrollment} isPrivate />
      <Route
        path="/enrollments/new"
        exact
        component={NewEnrollment}
        isPrivate
      />
      <Route
        path="/enrollments/:id"
        exact
        component={EditEnrollment}
        isPrivate
      />

      <Route path="/help-orders" exact component={HelpOrder} isPrivate />

      <Route path="/" component={() => <h1>404</h1>} />
    </Switch>
  );
}
