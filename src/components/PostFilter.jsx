import PropTypes from 'prop-types';

export function PostFilter({ field, value, onChange }) {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className='col-12 col-md-6'>
      <label className='form-label text-capitalize' htmlFor={`filter-${field}`}>
        {field}:
      </label>
      <input
        className='form-control'
        type='text'
        name={`filter-${field}`}
        id={`filter-${field}`}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}

PostFilter.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
