import mongoose from 'mongoose';
import { describe, expect, test, beforeEach } from '@jest/globals';

import {
  createPost,
  listAllPosts,
  // listPostsByAuthor,
  listPostsByTag,
  getPostById,
  // updatePost,
  deletePost,
} from '../services/posts.js';
import { Post } from '../db/models/post.js';

const authorId = '67019e2554cd40e7e0c6cc4b';

describe('creating posts', () => {
  test('with all parameters should succeed', async () => {
    const post = {
      title: 'Hello Mongoose',
      author: '67019e2554cd40e7e0c6cc4b',
      contents: 'This post is stored in MongoDB database using Mongoose',
      tags: ['mongodb', 'mongoose'],
    };
    const createdPost = await createPost(authorId, post);
    expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId);
    const foundPost = await Post.findById(createdPost._id);
    // expect(foundPost).toEqual(expect.objectContaining(post));
    expect(foundPost.createdAt).toBeInstanceOf(Date);
    expect(foundPost.updatedAt).toBeInstanceOf(Date);
  });

  test('creating posts without title should fail', async () => {
    const post = {
      author: '67019e2554cd40e7e0c6cc4b',
      contents: 'This post is stored in MongoDB database using Mongoose',
      tags: ['empty'],
    };

    try {
      await createPost(authorId, post);
    } catch (err) {
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(err.message).toContain('`title` is required');
    }
  });

  test('creating posts with minimal parameters should succeed', async () => {
    const post = {
      title: 'Only ttile',
    };
    const createdPost = await createPost(authorId, post);
    expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId);
  });
});

const samplePosts = [
  {
    title: 'Learning Redux',
    author: '67019e2554cd40e7e0c6cc4b',
    tags: ['redux'],
  },
  {
    title: 'Learning React Hooks',
    author: '67019e2554cd40e7e0c6cc4b',
    tags: ['react'],
  },
  {
    title: 'Full-Stack React Projects',
    author: '67019e2554cd40e7e0c6cc4b',
    tags: ['react', 'nodejs'],
  },
  // { title: 'Guide to Typescript' },
];

let createdSamplePosts = [];
beforeEach(async () => {
  await Post.deleteMany({});
  createdSamplePosts = [];
  for (let post of samplePosts) {
    const createdPost = new Post(post);
    createdSamplePosts.push(await createdPost.save());
  }
});

describe('listing posts', () => {
  test('should return all posts', async () => {
    const posts = await listAllPosts();
    expect(posts.length).toEqual(createdSamplePosts.length);
  });

  test('should return posts sorted by creation date descending by default', async () => {
    const posts = await listAllPosts();
    const sortedSamplePosts = createdSamplePosts.sort(
      (a, b) => b.createdAt - a.createdAt,
    );
    expect(posts.map((post) => post.createdAt)).toEqual(
      sortedSamplePosts.map((post) => post.createdAt),
    );
  });

  test('should take into account provided sorting options', async () => {
    const posts = await listAllPosts({
      sortBy: 'updatedAt',
      sortOrder: 'ascending',
    });
    const sortedSamplePosts = createdSamplePosts.sort(
      (a, b) => a.updatedAt - b.updatedAt,
    );
    expect(posts.map((post) => post.updatedAt)).toEqual(
      sortedSamplePosts.map((post) => post.updatedAt),
    );
  });

  /*  test('should be able filter posts by author', async () => {
    const posts = await listPostsByAuthor('Daniel Bugl');
    expect(posts.length).toBe(3);
  }); */

  test('should be able filter posts by tags', async () => {
    const posts = await listPostsByTag('nodejs');
    expect(posts.length).toBe(1);
  });
});

describe('getting a post', () => {
  test('should return the full post', async () => {
    const post = await getPostById(createdSamplePosts[0]._id);
    expect(post.toObject()).toEqual(createdSamplePosts[0].toObject());
  });

  test("should fail if id doesn't exist", async () => {
    const post = await getPostById('000000000000000000000000');
    expect(post).toEqual(null);
  });
});
/* 
describe('updating post', () => {
  test('should update the specified property', async () => {
    const AUTHOR = 'Test Author';
    await updatePost(authorId, createdSamplePosts[0]._id, {
      title: AUTHOR,
    });
    const updatedPost = await Post.findById(createdSamplePosts[0]._id);
    expect(updatedPost.title).toBe(AUTHOR);
  });

  test('should not update other properties', async () => {
    const AUTHOR = 'Test Author';
    await updatePost(authorId, createdSamplePosts[0]._id, {
      title: AUTHOR,
    });
    const updatedPost = await Post.findById(createdSamplePosts[0]._id);
    expect(updatedPost.tags).toBe(createdSamplePosts[0].title);
  });

  test('should update the updatedAt timestamp', async () => {
    await updatePost(createdSamplePosts[0]._id, {
      author: 'Test Author',
    });
    const updatedPost = await Post.findById(createdSamplePosts[0]._id);
    expect(updatedPost.updatedAt.getTime()).toBeGreaterThan(
      createdSamplePosts[0].updatedAt.getTime(),
    );
  });

  test("should fail is id doesn't exist", async () => {
    const post = await updatePost('000000000000000000000000', {
      author: 'Test Author',
    });
    expect(post).toEqual(null);
  });
}); */

describe('deleting post', () => {
  test('should remove the post from the database', async () => {
    const result = await deletePost(authorId, createdSamplePosts[0]._id);
    expect(result.deletedCount).toBe(1);
    const deletedPost = await Post.findById(createdSamplePosts[0]._id);
    expect(deletedPost).toEqual(null);
  });

  test("should fail if id doesn't exist", async () => {
    const result = await deletePost(authorId, '000000000000000000000000');
    expect(result.deletedCount).toBe(0);
  });
});
