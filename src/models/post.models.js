// src/models/post.model.js
const db = require('../utils/db');

const Post = {
  getAll: async () => {
    const result = await db.query('SELECT * FROM posts ORDER BY created_at DESC');
    return result.rows;
  },

  getById: async (id) => {
    const result = await db.query('SELECT * FROM posts WHERE id = $1', [id]);
    return result.rows[0];
  },

  create: async ({ title, content, user_id }) => {
    const result = await db.query(
      'INSERT INTO posts (title, content, user_id) VALUES ($1, $2, $3) RETURNING *',
      [title, content, user_id]
    );
    return result.rows[0];
  },

  update: async (id, { title, content }) => {
    const result = await db.query(
      'UPDATE posts SET title = $1, content = $2 WHERE id = $3 RETURNING *',
      [title, content, id]
    );
    return result.rows[0];
  },

  delete: async (id) => {
    const result = await db.query('DELETE FROM posts WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  },
};

module.exports = Post;
