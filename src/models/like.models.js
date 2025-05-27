// src/models/like.model.js
const db = require('../utils/db');

const Like = {
  getAll: async () => {
    const result = await db.query('SELECT * FROM likes');
    return result.rows;
  },

  getById: async (id) => {
    const result = await db.query('SELECT * FROM likes WHERE id = $1', [id]);
    return result.rows[0];
  },

  create: async ({ user_id, post_id }) => {
    const result = await db.query(
      'INSERT INTO likes (user_id, post_id) VALUES ($1, $2) RETURNING *',
      [user_id, post_id]
    );
    return result.rows[0];
  },

  delete: async (id) => {
    const result = await db.query('DELETE FROM likes WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  },

  findByUserAndPost: async (user_id, post_id) => {
    const result = await db.query(
      'SELECT * FROM likes WHERE user_id = $1 AND post_id = $2',
      [user_id, post_id]
    );
    return result.rows[0];
  },
};

module.exports = Like;
