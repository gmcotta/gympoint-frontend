import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import { Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import {
  Container,
  TableHeader,
  ListArea,
  ViewButton,
  NoHelpOrderArea,
  ModalBody,
  ReplyButton,
} from './styles';

import api from '~/services/api';

export default function HelpOrder() {
  const [helpOrders, setHelpOrders] = useState([]);

  useEffect(() => {
    async function loadHelpOrder() {
      const response = await api.get('help-orders');
      const helpOrderData = response.data;
      setHelpOrders(helpOrderData);
    }
    loadHelpOrder();
  }, []);

  async function handleStudentAnswer(data, id) {
    try {
      await api.post(`help-orders/${id}/answer`, data);
      toast.success('The question has been replied successfully');
    } catch (error) {
      toast.error('An error occurred. Please, try again later.');
    }
  }

  return (
    <Container>
      <TableHeader>
        <span>Help orders</span>
      </TableHeader>
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
                contentStyle={{ width: '450px' }}
              >
                {close => (
                  <ModalBody
                    onSubmit={data => {
                      handleStudentAnswer(data, h.id);
                      close();
                      window.location.reload(false);
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
