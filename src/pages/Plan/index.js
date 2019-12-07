import React, { useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md';
import { toast } from 'react-toastify';
import api from '~/services/api';
import history from '~/services/history';
import {
  Container,
  TableHeader,
  AddButton,
  Table,
  EditButton,
  RemoveButton,
  NoStudentArea,
} from './styles';
import { formatPrice } from '~/util/format';

export default function Student() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get('plans');
      const plansData = response.data.map(plan => ({
        ...plan,
        durationFormatted:
          plan.duration === 1
            ? `${plan.duration} month`
            : `${plan.duration} months`,
        priceFormatted: formatPrice(plan.price),
      }));
      setPlans(plansData);
      console.tron.log(plansData);
    }
    loadStudents();
  }, []);

  function handleAddPlan() {
    history.push('plans/new');
  }

  function handlePlanEdit(id) {
    // console.tron.log(`Edit student ${id}`);
    history.push(`plans/${id}`);
  }

  async function handlePlanRemove(plan_id) {
    if (window.confirm('Are you sure you wanna remove this plan?')) {
      try {
        await api.delete(`plans/${plan_id}`);
        const newPlans = plans.filter(plan => plan.id !== plan_id);
        setPlans(newPlans);
        toast.success('Plan removed successfully.');
        // console.tron.log(studentsData);
      } catch (error) {
        toast.error('An error occurred. Plase, try again later.');
        console.tron.log(error);
      }
    }
  }

  return (
    <Container>
      <TableHeader>
        <span>Managing Plans</span>
        <AddButton onClick={handleAddPlan}>
          <MdAdd size={16} />
          <span>Add</span>
        </AddButton>
      </TableHeader>
      {plans.length ? (
        <Table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Duration</th>
              <th>Monthly price</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {plans.map(plan => (
              <tr key={plan.id}>
                <td>{plan.title}</td>
                <td>{plan.durationFormatted}</td>
                <td>{plan.priceFormatted}</td>
                <td id="options">
                  <EditButton
                    type="button"
                    onClick={() => handlePlanEdit(plan.id)}
                  >
                    edit
                  </EditButton>
                  <RemoveButton
                    type="button"
                    onClick={() => {
                      handlePlanRemove(plan.id);
                    }}
                  >
                    remove
                  </RemoveButton>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <NoStudentArea>
          <h1>No plans found</h1>
        </NoStudentArea>
      )}
    </Container>
  );
}
