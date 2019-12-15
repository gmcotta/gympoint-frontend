import React, { useRef, useEffect } from 'react';
import Select from 'react-select';
import { useField } from '@rocketseat/unform';
import PropTypes from 'prop-types';

export default function AsyncSelectField({ name, ...rest }) {
  const ref = useRef(null);
  const { fieldName, registerField, error } = useField(name);

  function parseSelectValue(selectRef) {
    return selectRef.state.value;
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'state.value',
      parseValue: parseSelectValue,
      clearValue: selectRef => {
        selectRef.select.clearValue();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <div>
      <Select
        name={fieldName}
        ref={ref}
        className="selectField"
        isSearchable={false}
        {...rest}
      />
      {error && <span>{error}</span>}
    </div>
  );
}

AsyncSelectField.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
};
