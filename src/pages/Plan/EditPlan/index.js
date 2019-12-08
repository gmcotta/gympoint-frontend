import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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

export default function EditPlan() {
  const [plan, setPlan] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get('plans');
      const plansData = response.data.map(p => ({
        ...p,
        formattedPrice: formatPrice(p.price),
        totalPrice: formatPrice(p.duration * p.price),
      }));
      const currentPlan = plansData.find(p => p.id === Number(id));
      setPlan(currentPlan);
    }
    loadPlans();
  }, [id]);

  const schema = Yup.object().shape({
    title: Yup.string()
      .required()
      .typeError('Please, type a valid value.'),
    duration: Yup.number()
      .integer()
      .typeError('Please, type a valid value.'),
    price: Yup.number().typeError('Please, type a valid value.'),
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
      totalPrice: formatPrice(duration * newPrice),
    });
  }

  function changePrice(price) {
    const newPrice = removeCurrencySign(price);
    setPlan({
      ...plan,
      price: newPrice,
      totalPrice: formatPrice(plan.duration * newPrice),
    });
  }

  async function updatePlan(data) {
    const newData = {
      ...data,
      price: plan.price,
    };
    try {
      await api.put(`plans/${id}`, newData);
      toast.success('The plan has been updated!');
      history.push('/plans');
    } catch (error) {
      console.tron.log(error);
      toast.error(error);
    }
  }

  function goBack() {
    history.push('/plans');
  }

  return (
    <Container>
      <Form schema={schema} initialData={plan} onSubmit={updatePlan}>
        <FormHeader>
          <span>Edit Plan</span>
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
          <strong>Title</strong>
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
                name="formattedPrice"
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
