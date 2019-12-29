import React, { useState, useEffect } from 'react';
import { MdAdd, MdCheckCircle } from 'react-icons/md';
import { parseISO, format } from 'date-fns';
import { toast } from 'react-toastify';
import SelectField from '~/components/SelectField';
import api from '~/services/api';
import history from '~/services/history';
import {
  Container,
  TableHeader,
  ButtonArea,
  AddButton,
  TableContainer,
  Table,
  EditButton,
  RemoveButton,
  NoEnrollmentArea,
  Pagination,
  PageButtonArea,
  PageButton,
} from './styles';

export default function Enrollment() {
  const pageOptions = [
    { value: 5, label: '5 items per page' },
    { value: 10, label: '10 items per page' },
    { value: 15, label: '15 items per page' },
  ];
  const defaultPageOption = pageOptions[0];
  const [perPage, setPerPage] = useState(defaultPageOption.value);
  const [page, setPage] = useState(1);
  const [allItems, setAllItems] = useState();
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    async function loadEnrollments() {
      const { data: allEnrollments } = await api.get('enrollments');
      setAllItems(allEnrollments.length);

      const { data: response } = await api.get('enrollments', {
        params: { page, perPage },
      });
      const enrollmentsData = response.map(e => ({
        ...e,
        formattedStartDate: format(parseISO(e.start_date), "MMMM' 'dd', 'yyyy"),
        formattedEndDate: format(parseISO(e.end_date), "MMMM' 'dd', 'yyyy"),
      }));
      setEnrollments(enrollmentsData);
    }
    loadEnrollments();
  }, [page, perPage]);

  function handleAddEnrollment() {
    history.push('enrollments/new');
  }

  function handleEnrollmentEdit(id) {
    history.push(`enrollments/${id}`);
  }

  async function handleEnrollmentRemove(enrollment_id) {
    if (window.confirm('Are you sure you wanna remove this enrollment?')) {
      try {
        await api.delete(`enrollments/${enrollment_id}`);
        const newEnrollments = enrollments.filter(
          enrollment => enrollment.id !== enrollment_id
        );
        setEnrollments(newEnrollments);
        toast.success('Enrollment removed successfully.');
      } catch (error) {
        toast.error('An error occurred. Plase, try again later.');
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
        <span>Managing Enrollments</span>
        <ButtonArea>
          <AddButton onClick={handleAddEnrollment}>
            <MdAdd size={16} />
            <span>Add</span>
          </AddButton>
        </ButtonArea>
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
              enrollments.length < perPage ||
              page * enrollments.length === allItems
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

      {enrollments.length ? (
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Plan</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Active</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {enrollments.map(enrollment => (
                <tr className="item" key={enrollment.id}>
                  <td>{enrollment.Student.name}</td>
                  <td>{enrollment.Plan.title}</td>
                  <td>{enrollment.formattedStartDate}</td>
                  <td>{enrollment.formattedEndDate}</td>
                  <td>
                    <MdCheckCircle
                      size={16}
                      color={enrollment.active ? '#42cb59' : '#ddd'}
                    />
                  </td>
                  <td id="options">
                    <EditButton
                      type="button"
                      onClick={() => handleEnrollmentEdit(enrollment.id)}
                    >
                      edit
                    </EditButton>
                    <RemoveButton
                      type="button"
                      onClick={() => {
                        handleEnrollmentRemove(enrollment.id);
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
        <NoEnrollmentArea>
          <h1>No enrollments found</h1>
        </NoEnrollmentArea>
      )}
    </Container>
  );
}
