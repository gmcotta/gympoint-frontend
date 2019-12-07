import React from 'react';
import { MdArrowBack, MdSave } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import {
  Container,
  FormHeader,
  FormContent,
  ButtonArea,
  BackButton,
  SaveButton,
  PlanInfo,
} from './styles';
import api from '~/services/api';
import history from '~/services/history';

export default function NewPlan() {
  const schema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    duration: Yup.number()
      .integer()
      .required('Duration is required')
      .typeError('Duration is required'),
    price: Yup.number('Price is required')
      .required('Price is required')
      .typeError('Price is required'),
  });

  async function insertPlan(data) {
    try {
      await api.post('plans', data);
      toast.success('A new plan has been added!');
      history.push('/plans');
    } catch (error) {
      console.tron.log(error);
      toast.error(error);
    }
    console.tron.log(data);
  }

  function goBack() {
    history.push('/plans');
  }

  return (
    <Container>
      <Form schema={schema} onSubmit={insertPlan}>
        <FormHeader>
          <span>Add Plan</span>
          <ButtonArea>
            <BackButton type="button" onClick={goBack}>
              <MdArrowBack size={16} />
              <span>Back</span>
            </BackButton>
            <SaveButton type="submit">
              <MdSave size={16} />
              <span>Save</span>
            </SaveButton>
          </ButtonArea>
        </FormHeader>
        <FormContent>
          <strong>Plan</strong>
          <Input name="title" type="text" />
          <PlanInfo>
            <div>
              <strong>Duration (in months)</strong>
              <Input name="duration" type="number" />
            </div>
            <div>
              <strong>Monthly price</strong>
              <Input name="price" type="number" />
            </div>
            <div>
              <strong>Total price</strong>
              <Input
                className="disabled"
                name="totalPrice"
                type="text"
                disabled
              />
            </div>
          </PlanInfo>
        </FormContent>
      </Form>
    </Container>
  );
}
