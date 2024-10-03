import PropTypes from 'prop-types';

export function PostSorting({
  fields = [],
  sortBy,
  sortOrder,
  onChangeSortBy,
  onChangeSortOrder,
}) {
  const handleSortBy = (e) => {
    onChangeSortBy(e.target.value);
  };

  const handleSortOrder = (e) => {
    onChangeSortOrder(e.target.value);
  };

  return (
    <div className='d-flex align-items-end col-12 col-md-6'>
      <div className='flex-fill'>
        <label className='form-label' htmlFor='sortBy'>
          Sort By
        </label>
        <select
          className='form-select'
          name='sortBy'
          id='sortBy'
          value={sortBy}
          onChange={handleSortBy}
        >
          {fields.map((field) => (
            <option key={field} value={field}>
              {field}
            </option>
          ))}
        </select>
      </div>
      <div className='px-3 pb-2'>
        <span>/</span>
      </div>
      <div className='flex-fill'>
        <label className='form-label' htmlFor='sortOrder'>
          Sort By
        </label>
        <select
          className='form-select'
          name='sortOrder'
          id='sortOrder'
          value={sortOrder}
          onChange={handleSortOrder}
        >
          <option value='ascending'>Ascending</option>
          <option value='descending'>Descending</option>
        </select>
      </div>
    </div>
  );
}

PostSorting.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.string).isRequired,
  sortBy: PropTypes.string.isRequired,
  sortOrder: PropTypes.string.isRequired,
  onChangeSortBy: PropTypes.func.isRequired,
  onChangeSortOrder: PropTypes.func.isRequired,
};
