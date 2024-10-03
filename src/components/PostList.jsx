import PropTypes from 'prop-types';
import { Post } from './Post.jsx';

export function PostList({ posts = [] }) {
  return (
    <div
      className='container d-flex flex-column py-5'
      style={{ rowGap: '1.5rem' }}
    >
      {posts.map((post) => (
        <Post key={post._id} {...post} />
      ))}
    </div>
  );
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape(Post.propTypes)).isRequired,
};
