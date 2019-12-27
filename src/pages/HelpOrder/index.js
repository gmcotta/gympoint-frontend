import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import { Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import SelectField from '~/components/SelectField';
import {
  Container,
  TableHeader,
  ListArea,
  ViewButton,
  NoHelpOrderArea,
  ModalBody,
  ReplyButton,
  Pagination,
  PageButtonArea,
  PageButton,
} from './styles';

import api from '~/services/api';

export default function HelpOrder() {
  const pageOptions = [
    { value: 5, label: '5 items per page' },
    { value: 10, label: '10 items per page' },
    { value: 15, label: '15 items per page' },
  ];
  const defaultPageOption = pageOptions[0];
  const [perPage, setPerPage] = useState(defaultPageOption.value);
  const [page, setPage] = useState(1);
  const [allItems, setAllItems] = useState();

  const [helpOrders, setHelpOrders] = useState([]);

  useEffect(() => {
    async function helperLoadHelpOrder() {
      const { data: allHelpOrders } = await api.get('help-orders');
      setAllItems(allHelpOrders.length);

      const { data: response } = await api.get('help-orders', {
        params: { page, perPage },
      });
      setHelpOrders(response);
    }
    helperLoadHelpOrder();
  }, [page, perPage]);

  async function loadHelpOrder() {
    const { data: response } = await api.get('help-orders', {
      params: { page, perPage },
    });
    setHelpOrders(response);
  }

  async function handleStudentAnswer(data, id) {
    setPage(1);
    try {
      await api.post(`help-orders/${id}/answer`, data);
      loadHelpOrder();
      toast.success('The question has been replied successfully');
    } catch (error) {
      loadHelpOrder();
      toast.error('An error occurred. Please, try again later.');
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
        <span>Help orders</span>
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
              helpOrders.length < perPage ||
              page * helpOrders.length === allItems
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

      {helpOrders.length ? (
        <ListArea>
          <strong>Student</strong>
          {helpOrders.map(h => (
            <li key={h.id}>
              <span>{h.Student.name}</span>
              <Popup
                trigger={<ViewButton> view </ViewButton>}
                modal
                closeOnDocumentClick
                contentStyle={{ width: '450px', borderRadius: '4px' }}
              >
                {close => (
                  <ModalBody
                    onSubmit={data => {
                      handleStudentAnswer(data, h.id);
                      close();
                    }}
                  >
                    <strong>Student question</strong>
                    <p>{h.question}</p>
                    <strong>Your answer</strong>
                    <Input multiline name="answer" />
                    <ReplyButton type="submit">Reply student</ReplyButton>
                  </ModalBody>
                )}
              </Popup>
            </li>
          ))}
        </ListArea>
      ) : (
        <NoHelpOrderArea>
          <h1>No help orders found</h1>
        </NoHelpOrderArea>
      )}
    </Container>
  );
}
