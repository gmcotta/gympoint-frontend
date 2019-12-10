import React, { useState, useEffect } from 'react';
import { MdArrowBack, MdSave } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import Select from 'react-select';
import * as Yup from 'yup';
import { parseISO, format, addMonths } from 'date-fns';
import { toast } from 'react-toastify';
import {
  Container,
  FormHeader,
  FormContent,
  ButtonArea,
  BackButton,
  SaveButton,
  EnrollmentInfo,
} from './styles';
import api from '~/services/api';
import history from '~/services/history';
import { formatPrice } from '~/util/format';

export default function NewEnrollment() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const [startDate, setStartDate] = useState(null);
  const [enrollment, setEnrollment] = useState({
    end_date: null,
    totalPrice: null,
  });

  const schema = Yup.object().shape({
    start_date: Yup.date()
      .required()
      .typeError('Please, choose a valid value'),
  });

  useEffect(() => {
    async function loadStudents() {
      const studentResponse = await api.get('students');
      const studentData = studentResponse.data.map(s => ({
        value: s.id,
        label: s.name,
      }));
      setStudents(studentData);
    }
    async function loadPlans() {
      const planResponse = await api.get('plans');
      const planData = planResponse.data.map(p => ({
        value: p.id,
        label: p.title,
      }));
      setPlans(planData);
    }
    loadStudents();
    loadPlans();
  }, []);

  async function insertEnrollment(data) {
    console.log(data);
    /*
    try {
      await api.post('enrollments', data);
      toast.success('A new enrollment has been added!');
      history.push('/enrollments');
    } catch (error) {
      console.tron.log(error);
      toast.error(error);
    }
    console.tron.log(data);
    */
  }

  function goBack() {
    history.push('/enrollments');
  }

  function handleStudentChange(e) {
    setSelectedStudent(e);
  }

  async function handlePlanChange(e) {
    setSelectedPlan(e);
    const planResponse = await api.get('plans');
    const currentPlan = planResponse.data.find(p => p.id === e.value);
    setEnrollment({
      ...enrollment,
      totalPrice: formatPrice(currentPlan.price),
      end_date: startDate
        ? format(
            addMonths(parseISO(startDate), currentPlan.duration),
            'dd/MM/yyyy'
          )
        : enrollment.end_date,
    });
  }

  async function handleStartDateChange(e) {
    setStartDate(e.target.value);
    console.log(selectedPlan);
  }

  return (
    <Container>
      <Form
        schema={schema}
        initialData={enrollment}
        onSubmit={insertEnrollment}
      >
        <FormHeader>
          <span>Add Enrollment</span>
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
          <Select
            name="student"
            className="studentSelect"
            value={selectedStudent}
            onChange={handleStudentChange}
            placeholder="Select a student"
            options={students}
          />
          <EnrollmentInfo>
            <div>
              <strong>Plan</strong>
              <Select
                name="plan"
                className="planSelect"
                value={selectedPlan}
                onChange={handlePlanChange}
                placeholder="Select a plan"
                options={plans}
              />
            </div>
            <div>
              <strong>Start Date</strong>
              <Input
                name="start_date"
                type="date"
                onChange={handleStartDateChange}
                placeholder="Select date"
              />
            </div>
            <div>
              <strong>End Date</strong>
              <Input
                className="disabled"
                name="end_date"
                type="text"
                disabled
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
          </EnrollmentInfo>
        </FormContent>
      </Form>
    </Container>
  );
}
