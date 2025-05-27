// src/controllers/like.controllers.js
const Like = require('../models/like.model');

exports.getAllLikes = async (req, res) => {
  try {
    const likes = await Like.getAll();
    res.json(likes);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los likes' });
  }
};

exports.getLikeById = async (req, res) => {
  try {
    const { id } = req.params;
    const like = await Like.getById(id);
    if (!like) return res.status(404).json({ error: 'Like no encontrado' });
    res.json(like);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el like' });
  }
};

exports.createLike = async (req, res) => {
  try {
    const { user_id, post_id } = req.body;
    const existing = await Like.findByUserAndPost(user_id, post_id);
    if (existing) return res.status(400).json({ error: 'Ya diste like a este post' });

    const newLike = await Like.create({ user_id, post_id });
    res.status(201).json(newLike);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el like' });
  }
};

exports.deleteLike = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Like.delete(id);
    if (!deleted) return res.status(404).json({ error: 'Like no encontrado' });
    res.json({ message: 'Like eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar el like' });
  }
};
