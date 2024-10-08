import { PostList } from '../components/PostList.jsx';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CreatePost } from '../components/CreatePost.jsx';
import { PostFilter } from '../components/PostFilter.jsx';
import { PostSorting } from '../components/PostSorting.jsx';
import { getPosts } from '../api/posts.js';
import { Header } from '../components/Header.jsx';

export function Blog() {
  const [author, setAuthor] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('descending');

  const postQuery = useQuery({
    queryKey: ['posts', { author, sortBy, sortOrder }],
    queryFn: () => getPosts({ author, sortBy, sortOrder }),
  });

  const posts = postQuery.data || [];

  const handleAuthorChange = (value) => {
    setAuthor(value);
  };

  const handleSortBy = (value) => {
    setSortBy(value);
  };

  const handleSortOrder = (value) => {
    setSortOrder(value);
  };

  return (
    <>
      <Header />
      <PostList posts={posts} />
      <div className='container'>
        <div className='row mb-4'>
          <PostFilter
            field='author'
            value={author}
            onChange={handleAuthorChange}
          />
          <PostSorting
            fields={['createdAt', 'updatedAt']}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onChangeSortBy={handleSortBy}
            onChangeSortOrder={handleSortOrder}
          />
        </div>
      </div>
      <CreatePost />
    </>
  );
}
