// const Post = require('../models/Post');
// const Comment = require('../models/Comment')

// // Endpoint pour ajouter un commentaire à un post
// exports.postComment = async (req, res) => {
//     try {
//       const { postId, text } = req.body;
      
//       // Créez un nouveau commentaire
//       const newComment = new Comment({ text });
      
//       // Enregistrez le commentaire dans la base de données
//       await newComment.save();
      
//       // Trouvez le post correspondant par son ID
//       const post = await Post.findById(postId);
      
//       // Ajoutez l'ID du commentaire au tableau de commentaires du post
//       post.comments.push(newComment._id);
      
//       // Enregistrez les modifications du post
//       await post.save();
      
//       res.status(201).json({ message: 'Commentaire ajouté avec succès' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Une erreur est survenue lors de l\'ajout du commentaire' });
//     }
//   };


// // Récupérer et afficher tous les commentaires liés à un post
// exports.getCommentsForPost = async (req, res) => {
//     try {
//         const postId = req.params.postId;

//         // Recherchez le post par son ID
//         const post = await Post.findById(postId);

//         if (!post) {
//             return res.status(404).json({ error: 'Post not found' });
//         }

//         // Récupérez les commentaires associés au post
//         const comments = await Comment.find({ _id: { $in: post.comments } });

//         res.status(200).json(comments);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'An error occurred while fetching comments' });
//     }
// };
