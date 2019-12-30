import React, { useRef, useState, useEffect } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useField } from '@rocketseat/unform';
import PropTypes from 'prop-types';

export default function DatepickerField({ name, ...rest }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [selected, setSelected] = useState(defaultValue);

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
    <section>
      <ReactDatePicker
        name={fieldName}
        dateFormat="MM/dd/yyyy"
        ref={ref}
        selected={selected}
        onChange={date => setSelected(date)}
        {...rest}
      />
      {error && <span>{error}</span>}
    </section>
  );
}

DatepickerField.propTypes = {
  name: PropTypes.string.isRequired,
};
