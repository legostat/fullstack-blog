import {
  listAllPosts,
  listPostsByAuthor,
  listPostsByTag,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from '../services/posts.js';

export function postRoutes(app) {
  app.get('/api/v1/posts', async (req, res) => {
    const { sortBy, sortOrder, author, tag } = req.query;
    const options = { sortBy, sortOrder };

    try {
      if (author && tag) {
        return res.status(400).json({
          error: 'Query by either author or tag, not both',
        });
      }

      if (author) {
        return res.json(await listPostsByAuthor(author, options));
      }

      if (tag) {
        return res.json(await listPostsByTag(tag, options));
      }

      return res.json(await listAllPosts(options));
    } catch (err) {
      console.log('Error listing posts', err);
      return res.status(500).end();
    }
  });

  app.get('/api/v1/posts/:id', async (req, res) => {
    const { id } = req.params;

    try {
      const post = await getPostById(id);

      if (post === null) {
        return res.status(404).end();
      }

      return res.json(post);
    } catch (err) {
      console.log('Error getting posts', err);
      return res.status(500).end();
    }
  });

  app.post('/api/v1/posts', async (req, res) => {
    try {
      const post = await createPost(req.body);
      return res.json(post);
    } catch (err) {
      console.log('Error creating posts', err);
      return res.status(500).end();
    }
  });

  app.patch('/api/v1/posts/:id', async (req, res) => {
    try {
      const post = await updatePost(req.params.id, req.body);
      return res.json(post);
    } catch (err) {
      console.log('Error updating posts', err);
      return res.status(500).end();
    }
  });

  app.delete('/api/v1/posts/:id', async (req, res) => {
    try {
      const { deletedCount } = await deletePost(req.params.id);
      if (deletedCount > 0) {
        return res.status(204).end();
      }
      return res.sendStatus(404);
    } catch (err) {
      console.log('Error deleting posts', err);
      return res.status(500).end();
    }
  });
}
