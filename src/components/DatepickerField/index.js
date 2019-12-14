import React, { useRef, useEffect } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useField } from '@rocketseat/unform';
import PropTypes from 'prop-types';

export default function DatepickerField({ name, ...rest }) {
  const ref = useRef(null);
  const { fieldName, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <>
      <ReactDatePicker
        name={fieldName}
        dateFormat="MM/dd/yyyy"
        ref={ref}
        {...rest}
      />
    </>
  );
}

DatepickerField.propTypes = {
  name: PropTypes.string.isRequired,
};
