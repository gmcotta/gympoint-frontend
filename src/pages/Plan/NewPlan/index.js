import React, { useState } from 'react';
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
import { formatPrice } from '~/util/format';

export default function NewPlan() {
  const [plan, setPlan] = useState({
    title: '',
    duration: '',
    price: formatPrice(0),
    totalPrice: '',
  });
  const schema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    duration: Yup.number()
      .integer()
      .required('Duration is required')
      .typeError('Duration is required'),
    price: Yup.string('Price is required')
      .required('Price is required')
      .typeError('Price is required'),
  });

  function removeCurrencySign(price) {
    if (price.toString().charAt(0) === '$') {
      return price.substring(1);
    }
    return price;
  }

  function changeTitle(title) {
    setPlan({
      ...plan,
      title,
    });
  }

  function changeDuration(duration) {
    const newPrice = removeCurrencySign(plan.price);
    setPlan({
      ...plan,
      duration,
      totalPrice: formatPrice(newPrice * duration),
    });
  }

  function changePrice(price) {
    const newPrice = removeCurrencySign(price);
    setPlan({
      ...plan,
      price: formatPrice(newPrice),
      totalPrice: formatPrice(newPrice * plan.duration),
    });
  }

  async function insertPlan(data) {
    const newData = {
      ...data,
      price: Number(removeCurrencySign(data.price)),
    };

    try {
      await api.post('plans', newData);
      toast.success('A new plan has been added!');
      history.push('/plans');
    } catch (error) {
      toast.error('An error occurred. Please, try again later.');
    }
  }

  function goBack() {
    history.push('/plans');
  }

  return (
    <Container>
      <Form schema={schema} initialData={plan} onSubmit={insertPlan}>
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
          <Input
            name="title"
            type="text"
            onChange={e => changeTitle(e.target.value)}
          />
          <PlanInfo>
            <div>
              <strong>Duration (in months)</strong>
              <Input
                name="duration"
                type="number"
                onChange={e => changeDuration(e.target.value)}
              />
            </div>
            <div>
              <strong>Monthly price</strong>
              <Input
                name="price"
                type="text"
                onChange={e => changePrice(e.target.value)}
              />
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
