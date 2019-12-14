import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { addMonths, format } from 'date-fns';
import AsyncSelectField from '~/components/AsyncSelectField';
import SelectField from '~/components/SelectField';
import DatepickerField from '~/components/DatepickerField';

import api from '~/services/api';
import { formatPrice } from '~/util/format';

export default function Teste() {
  const schema = Yup.object().shape({
    student: Yup.object()
      .shape({
        value: Yup.number().integer(),
      })
      .typeError('Valor inválido')
      .required('Aluno obrigatório'),
    plan: Yup.object()
      .shape({
        value: Yup.number().integer(),
      })
      .typeError('Valor inválido')
      .required('Aluno obrigatório'),
    start_date: Yup.date()
      .typeError('Valor inválido')
      .required('Data obrigatória'),
  });

  const [enrollment, setEnrollment] = useState({});
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    async function loadPlans() {
      const { data: response } = await api.get('plans');
      const planData = response.map(p => ({
        label: p.title,
        value: p.id,
        duration: p.duration,
        price: p.price,
      }));
      setPlans(planData);
    }
    loadPlans();
  }, []);

  const handleSelectOptions = async inputValue => {
    const { data: response } = await api.get('students');
    const studentData = response.map(s => ({
      label: s.name,
      value: s.id,
    }));
    return studentData.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadStudentOptions = inputValue =>
    new Promise(resolve => {
      resolve(handleSelectOptions(inputValue));
    });

  function handlePlanOption(plan) {
    setEnrollment({
      ...enrollment,
      plan_id: plan.value,
      duration: plan.duration,
      end_date: enrollment.start_date
        ? format(addMonths(enrollment.start_date, plan.duration), 'MM/dd/yyyy')
        : null,
      price: formatPrice(plan.duration * plan.price),
    });
  }

  function handleStartDateChange(date) {
    setEnrollment({
      ...enrollment,
      start_date: date,
      end_date: enrollment.duration
        ? format(addMonths(date, enrollment.duration), 'MM/dd/yyyy')
        : null,
    });
  }

  function insertEnrollment(data) {
    console.log(data);
    // const student_id = data.student.value;
    // const plan_id = data.plan.value;
  }

  return (
    <Form schema={schema} initialData={enrollment} onSubmit={insertEnrollment}>
      <AsyncSelectField
        name="student"
        loadOptions={loadStudentOptions}
        placeholder="Select a student..."
      />
      <SelectField
        name="plan"
        options={plans}
        onChange={handlePlanOption}
        placeholder="Select a plan..."
      />
      <DatepickerField
        name="start_date"
        selected={enrollment.start_date}
        onChange={handleStartDateChange}
        placeholderText="Select a date..."
      />
      <Input disabled name="end_date" type="text" />
      <Input disabled name="price" type="text" />

      <button type="submit">Salvar</button>
    </Form>
  );
}
