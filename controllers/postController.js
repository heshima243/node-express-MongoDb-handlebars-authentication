const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Post = require('../models/Post');

exports.getHome = async (req, res) => {
  try {
    // Fetch posts from MongoDB and sort by _id in descending orde
    const posts = await Post.find().sort({ date: -1 }).exec();
    // Respond with the sorted posts as JSON
    res.json({ posts });
  } catch (error) {
    // Handle errors
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Affichage du formulaire de login
exports.getPost = (req, res) => {
  res.json({ message: 'post article' });
};


// Gestion de la soumission du formulaire de logup
exports.postPost = async (req, res, next) => {
  const post = new Post(req.body);
  const savePost = await post.save()
  res.send(savePost)
};


// Récupération de tous les post
exports.getList = async (req, res, next) => {
  try {

    const post = await Post.find().sort({ date: -1 }).exec();
    // const post = await Post.find({});
    res.status(200).json({ post });
  } catch (e) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Récupération et mise à jour d'un post
exports.getUpdateList = async (req, res, next) => {
  const postId = req.params.id;
  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: 'post not found' });
    res.status(200).json({ post });
  } catch (e) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


// post update list
// exports.postUpdateList = async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     const { title, body } = req.body;

//     const post = await Post.findByIdAndUpdate(id, { title, body }, { new: true });

//     if (!post) {
//       return res.status(404).json({ error: 'Post not found' });
//     }

//     await post.save();

//     res.status(200).json({ message: 'post updated successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error updating the data' });
//   }
// };

exports.putUpdateList = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { title, body } = req.body;

    const post = await Post.findByIdAndUpdate(id, { title, body }, { new: true });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    await post.save();

    res.status(200).json({ message: 'Post updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating the data' });
  }
};


// Suppression d'un utilisateur
exports.getDelete = async (req, res, next) => {
  const postId = req.params.id;
  try {
    const post = await Post.findByIdAndDelete(postId);

    if (!post) return res.status(404).json({ error: 'post not found' });
    res.status(200).json({ message: 'post deleted successfully' });
  } catch (e) {
    res.status(500).json({ error: 'Internal server error' });
  }
};









