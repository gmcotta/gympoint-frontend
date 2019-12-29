import React, { useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md';
import { toast } from 'react-toastify';
import SelectField from '~/components/SelectField';
import api from '~/services/api';
import history from '~/services/history';
import {
  Container,
  TableHeader,
  AddButton,
  TableContainer,
  Table,
  EditButton,
  RemoveButton,
  NoStudentArea,
  Pagination,
  PageButtonArea,
  PageButton,
} from './styles';
import { formatPrice } from '~/util/format';

export default function Plan() {
  const pageOptions = [
    { value: 5, label: '5 items per page' },
    { value: 10, label: '10 items per page' },
    { value: 15, label: '15 items per page' },
  ];
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
      // console.tron.log(plansData);
    }
    loadPlans();
  }, [page, perPage]);

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

      <Pagination>
        <PageButtonArea>
          <PageButton
            disabled={page === 1}
            type="button"
            onClick={handlePrevPage}
          >
            Prev Page
          </PageButton>
          <span>{page}</span>
          <PageButton
            disabled={
              plans.length < perPage || page * plans.length === allItems
            }
            type="button"
            onClick={handleNextPage}
          >
            Next Page
          </PageButton>
        </PageButtonArea>
        <SelectField
          name="perPage"
          defaultValue={defaultPageOption}
          options={pageOptions}
          onChange={handlePageOption}
          classNamePrefix="perPagePicker"
        />
      </Pagination>

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
