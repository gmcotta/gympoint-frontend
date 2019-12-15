import React, { useRef, useEffect } from 'react';
import AsyncSelect from 'react-select/async';
import { useField } from '@rocketseat/unform';
import PropTypes from 'prop-types';

export default function AsyncSelectField({ name, ...rest }) {
  const ref = useRef(null);
  const { fieldName, registerField, error } = useField(name);

  function parseSelectValue(selectRef) {
    return selectRef.select.state.value;
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
      <AsyncSelect
        name={fieldName}
        cacheOptions
        defaultOptions
        ref={ref}
        {...rest}
      />
      {error && <span>{error}</span>}
    </div>
  );
}

AsyncSelectField.propTypes = {
  name: PropTypes.string.isRequired,
};
