const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  // D'autres champs de commentaire si nécessaire
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Remplacez 'User' par le nom de votre modèle d'utilisateur
  },
  date: {
    type: Date,
    default: Date.now,
  },

  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment', // Remplacez 'Comment' par le nom de votre modèle de commentaire
    },
  ],
});

// Exportez le modèle de commentaire
module.exports = mongoose.model('Comment', commentSchema);
