import React, { useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md';
import { toast } from 'react-toastify';
import api from '~/services/api';
import history from '~/services/history';
import Pagination from '~/components/Pagination';
import { pageOptions } from '~/components/pageOptions';
import { formatPrice } from '~/util/format';
import {
  Container,
  TableHeader,
  AddButton,
  TableContainer,
  Table,
  EditButton,
  RemoveButton,
  NoStudentArea,
} from './styles';

export default function Plan() {
  const defaultPageOption = pageOptions[0];
  const [perPage, setPerPage] = useState(defaultPageOption.value);
  const [page, setPage] = useState(1);
  const [allItems, setAllItems] = useState();
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    async function loadPlans() {
      const { data: allPlans } = await api.get('plans');
      setAllItems(allPlans.length);

      const { data: response } = await api.get('plans', {
        params: { page, perPage },
      });
      const plansData = response.map(plan => ({
        ...plan,
        durationFormatted:
          plan.duration === 1
            ? `${plan.duration} month`
            : `${plan.duration} months`,
        priceFormatted: formatPrice(plan.price),
      }));
      setPlans(plansData);
    }
    loadPlans();
  }, [page, perPage]);

  function handleAddPlan() {
    history.push('plans/new');
  }

  function handlePlanEdit(id) {
    history.push(`plans/${id}`);
  }

  async function handlePlanRemove(plan_id) {
    if (window.confirm('Are you sure you wanna remove this plan?')) {
      try {
        await api.delete(`plans/${plan_id}`);
        const newPlans = plans.filter(plan => plan.id !== plan_id);
        setPlans(newPlans);
        toast.success('Plan removed successfully.');
      } catch (error) {
        toast.error('An error occurred. Plase, try again later.');
        console.tron.log(error);
      }
    }
  }

  function handleNextPage() {
    setPage(page + 1);
  }

  function handlePrevPage() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  function handlePageOption(e) {
    setPerPage(e.value);
    setPage(1);
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

      <Pagination
        prevButtonDisabled={page === 1}
        handlePrevPage={handlePrevPage}
        page={page}
        nextButtonDisabled={
          plans.length < perPage || page * plans.length === allItems
        }
        handleNextPage={handleNextPage}
        defaultPageOption={defaultPageOption}
        pageOptions={pageOptions}
        handlePageOption={handlePageOption}
      />

      {plans.length ? (
        <TableContainer>
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
                <tr className="item" key={plan.id}>
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
        </TableContainer>
      ) : (
        <NoStudentArea>
          <h1>No plans found</h1>
        </NoStudentArea>
      )}
    </Container>
  );
}
