import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { addMonths, format } from 'date-fns';
import { MdArrowBack, MdSave } from 'react-icons/md';
import { toast } from 'react-toastify';
import {
  Container,
  FormHeader,
  ButtonArea,
  BackButton,
  SaveButton,
  FormContent,
  EnrollmentInfo,
} from './styles';

import SelectField from '~/components/SelectField';
import DatepickerField from '~/components/DatepickerField';
import AsyncSelectField from '~/components/AsyncSelectField';
import 'react-datepicker/dist/react-datepicker.css';

import api from '~/services/api';
import history from '~/services/history';
import { formatPrice } from '~/util/format';

export default function NewEnrollment() {
  const schema = Yup.object().shape({
    student: Yup.object()
      .shape({
        value: Yup.number().integer(),
      })
      .typeError('Please, select a valid value.')
      .required('Please, select a valid value.'),
    plan: Yup.object()
      .shape({
        value: Yup.number().integer(),
      })
      .typeError('Please, select a valid value.')
      .required('Please, select a valid value.'),
    start_date: Yup.date()
      .min(new Date(), 'Please, select a valid value.')
      .typeError('Please, select a valid value.')
      .required('Please, select a valid value.'),
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
    const name = '';
    const { data: response } = await api.get('students', {
      params: { name },
    });
    const studentData = response.map(s => ({
      label: s.name,
      value: s.id,
    }));
    const { data: enrollments } = await api.get('enrollments', {
      params: { name },
    });
    const studentsWithEnrollment = enrollments.map(e => e.Student.name);
    const studentsWithoutEnrollment = studentData.filter(
      s => !studentsWithEnrollment.includes(s.label)
    );
    return studentsWithoutEnrollment.filter(i =>
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

  function goBack() {
    history.push('/enrollments');
  }

  async function insertEnrollment(data) {
    const newData = {
      student_id: data.student.value,
      plan_id: data.plan.value,
      start_date: data.start_date,
    };
    try {
      await api.post('enrollments', newData);
      toast.success('A new enrollment has been added!');
      history.push('/enrollments');
    } catch (error) {
      toast.error('An error occurred. Please, try again later.');
    }
  }

  return (
    <Container>
      <Form
        schema={schema}
        initialData={enrollment}
        onSubmit={insertEnrollment}
      >
        <FormHeader>
          <span>New Enrollment</span>
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
          <strong>Student</strong>
          <AsyncSelectField
            name="student"
            loadOptions={loadStudentOptions}
            placeholder="Select a student..."
            classNamePrefix="studentPicker"
          />
          <EnrollmentInfo>
            <section>
              <strong>Plan</strong>
              <SelectField
                name="plan"
                options={plans}
                onChange={handlePlanOption}
                placeholder="Select a plan..."
                classNamePrefix="planPicker"
              />
            </section>
            <section>
              <strong>Start date</strong>
              <DatepickerField
                name="start_date"
                selected={enrollment.start_date}
                onChange={handleStartDateChange}
                placeholderText="Select a date..."
              />
            </section>
            <section>
              <strong>End date</strong>
              <Input
                className="disabled"
                disabled
                name="end_date"
                type="text"
              />
            </section>
            <section>
              <strong>Total price</strong>
              <Input className="disabled" disabled name="price" type="text" />
            </section>
          </EnrollmentInfo>
        </FormContent>
      </Form>
    </Container>
  );
}
