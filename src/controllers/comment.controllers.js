// src/controllers/comment.controllers.js
const Comment = require('../models/comment.model');

exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.getAll();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los comentarios' });
  }
};

exports.getCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.getById(id);
    if (!comment) return res.status(404).json({ error: 'Comentario no encontrado' });
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el comentario' });
  }
};

exports.getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.getByPostId(postId);
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los comentarios del post' });
  }
};

exports.createComment = async (req, res) => {
  try {
    const { content, user_id, post_id } = req.body;
    const newComment = await Comment.create({ content, user_id, post_id });
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el comentario' });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const updatedComment = await Comment.update(id, { content });
    if (!updatedComment) return res.status(404).json({ error: 'Comentario no encontrado' });
    res.json(updatedComment);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el comentario' });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Comment.delete(id);
    if (!deleted) return res.status(404).json({ error: 'Comentario no encontrado' });
    res.json({ message: 'Comentario eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar el comentario' });
  }
};
