import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { addMonths, format, parseISO } from 'date-fns';
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
    start_date: Yup.date()
      .min(new Date(), 'Please, select a valid value.')
      .typeError('Please, select a valid value.'),
  });

  const [enrollment, setEnrollment] = useState({});
  const [plans, setPlans] = useState([]);
  const [students, setStudents] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    async function loadEnrollment() {
      const { data: response } = await api.get(`enrollments/${id}`);
      console.log(response);
      setEnrollment({
        student: response.student,
        plan: response.plan,
        duration: response.Plan.duration,
        start_date: parseISO(response.start_date),
        end_date: format(
          addMonths(parseISO(response.start_date), response.Plan.duration),
          'MM/dd/yyyy'
        ),
        price: formatPrice(response.price),
      });
    }
    loadEnrollment();
  }, [id]);

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
    // plans.filter(({ value }) => value === enrollment.plan);
    setStudents(studentData);
    return studentData.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadStudentOptions = inputValue =>
    new Promise(resolve => {
      resolve(handleSelectOptions(inputValue));
    });

  function handleStudentOption(student) {
    setEnrollment({
      ...enrollment,
      student: student.value,
    });
  }

  function handlePlanOption(plan) {
    setEnrollment({
      ...enrollment,
      plan: plan.value,
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

  async function updateEnrollment(data) {
    console.log(enrollment, data);
    const newData = {
      student_id: enrollment.student,
      plan_id: enrollment.plan,
      start_date: data.start_date,
      end_date: enrollment.end_date,
      price: Number(enrollment.price.substr(1)),
    };
    try {
      await api.put(`enrollments/${id}`, newData);
      toast.success('The enrollment has been updated!');
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
        onSubmit={updateEnrollment}
      >
        <FormHeader>
          <span>Edit Enrollment</span>
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
            value={students.filter(({ value }) => value === enrollment.student)}
            onChange={handleStudentOption}
            placeholder="Select a student..."
            classNamePrefix="studentPicker"
            isDisabled
          />
          <EnrollmentInfo>
            <section>
              <strong>Plan</strong>
              <SelectField
                name="plan"
                options={plans}
                value={plans.filter(({ value }) => value === enrollment.plan)}
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
