// src/models/comment.model.js
const db = require('../utils/db');

const Comment = {
  getAll: async () => {
    const result = await db.query('SELECT * FROM comments ORDER BY created_at DESC');
    return result.rows;
  },

  getById: async (id) => {
    const result = await db.query('SELECT * FROM comments WHERE id = $1', [id]);
    return result.rows[0];
  },

  getByPostId: async (post_id) => {
    const result = await db.query('SELECT * FROM comments WHERE post_id = $1 ORDER BY created_at ASC', [post_id]);
    return result.rows;
  },

  create: async ({ content, user_id, post_id }) => {
    const result = await db.query(
      'INSERT INTO comments (content, user_id, post_id) VALUES ($1, $2, $3) RETURNING *',
      [content, user_id, post_id]
    );
    return result.rows[0];
  },

  update: async (id, { content }) => {
    const result = await db.query(
      'UPDATE comments SET content = $1 WHERE id = $2 RETURNING *',
      [content, id]
    );
    return result.rows[0];
  },

  delete: async (id) => {
    const result = await db.query('DELETE FROM comments WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  },
};

module.exports = Comment;
