import PropTypes from 'prop-types';

export function Post({ title, contents, author }) {
  return (
    <article className='p-3 shadow rounded-3'>
      <h3 className='h-2 fw-bold mb-2'>{title}</h3>
      <div className='fs-4 fw-semibold mb-2'>{contents}</div>
      {author && (
        <div className='fst-italic text-secondary'>Written by {author}</div>
      )}
    </article>
  );
}

Post.propTypes = {
  title: PropTypes.string.isRequired,
  contents: PropTypes.string,
  author: PropTypes.string,
};
