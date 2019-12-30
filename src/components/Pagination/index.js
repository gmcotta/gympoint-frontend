import React from 'react';
import PropTypes from 'prop-types';
import SelectField from '~/components/SelectField';
import { Container, PageButtonArea, PageButton } from './styles';

export default function Pagination({
  prevButtonDisabled,
  handlePrevPage,
  page,
  nextButtonDisabled,
  handleNextPage,
  defaultPageOption,
  pageOptions,
  handlePageOption,
}) {
  return (
    <Container>
      <PageButtonArea>
        <PageButton
          disabled={prevButtonDisabled}
          type="button"
          onClick={handlePrevPage}
        >
          Prev Page
        </PageButton>
        <span>{page}</span>
        <PageButton
          disabled={nextButtonDisabled}
          type="button"
          onClick={handleNextPage}
        >
          Next Page
        </PageButton>
      </PageButtonArea>
      <SelectField
        name="perPage"
        defaultValue={defaultPageOption}
        options={pageOptions}
        onChange={handlePageOption}
        classNamePrefix="perPagePicker"
      />
    </Container>
  );
}

Pagination.propTypes = {
  prevButtonDisabled: PropTypes.bool.isRequired,
  handlePrevPage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  nextButtonDisabled: PropTypes.bool.isRequired,
  handleNextPage: PropTypes.func.isRequired,
  defaultPageOption: PropTypes.objectOf(PropTypes.object).isRequired,
  pageOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  handlePageOption: PropTypes.func.isRequired,
};
