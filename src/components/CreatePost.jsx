import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { createPost } from '../api/posts.js';

export function CreatePost() {
  const [postData, setPostData] = useState({
    title: '',
    author: '',
    contents: '',
  });

  const queryClient = useQueryClient();
  const createPostMutation = useMutation({
    mutationFn: () => createPost(postData),
    onSuccess: () => queryClient.invalidateQueries(['posts']),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createPostMutation.mutate();
  };

  const handleInput = (e) => {
    setPostData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className='container'>
      <div className='row'>
        <form
          className='col-12 col-md-6 offset-md-3 d-grid gap-3'
          onSubmit={handleSubmit}
        >
          {' '}
          <div>
            <label className='form-label' htmlFor='title'>
              Title:
            </label>
            <input
              className='form-control'
              type='text'
              name='title'
              id='title'
              value={postData.title}
              onChange={handleInput}
            />
          </div>
          <div>
            <label className='form-label' htmlFor='author'>
              Author:
            </label>
            <input
              className='form-control'
              type='text'
              name='author'
              id='author'
              value={postData.author}
              onChange={handleInput}
            />
          </div>
          <div>
            <label className='form-label' htmlFor='contents'>
              Content:
            </label>
            <textarea
              className='form-control'
              name='contents'
              id='contents'
              rows={3}
              value={postData.contents}
              onChange={handleInput}
            ></textarea>
          </div>
          <div className='d-flex justify-content-center'>
            <button
              className='btn btn-primary btn-lg'
              type='submit'
              disabled={!postData.title || createPostMutation.isPending}
            >
              {createPostMutation.isPending ? 'Creating...' : 'Create'}
            </button>
          </div>
          {createPostMutation.isSuccess ? (
            <div className='alert alert-success' role='alert'>
              Post created successfully!
            </div>
          ) : null}
        </form>
      </div>
    </div>
  );
}
