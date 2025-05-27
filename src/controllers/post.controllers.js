// src/controllers/post.controllers.js
const Post = require('../models/post.model');

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.getAll();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los posts' });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.getById(id);
    if (!post) return res.status(404).json({ error: 'Post no encontrado' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el post' });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { title, content, user_id } = req.body;
    const newPost = await Post.create({ title, content, user_id });
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el post' });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const updatedPost = await Post.update(id, { title, content });
    if (!updatedPost) return res.status(404).json({ error: 'Post no encontrado' });
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el post' });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Post.delete(id);
    if (!deleted) return res.status(404).json({ error: 'Post no encontrado' });
    res.json({ message: 'Post eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar el post' });
  }
};
