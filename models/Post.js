const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const Comment = require('./Comment')

const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const validator = require('validator')



const postSchema = new Schema({
  
  author: {
    type: String,
    required: "ce champs est obligatoire",
  },
  category: {
    type: String,
    required: "ce champs est obligatoire",
  },
  title: {
    type: String,
    required: "ce champs est obligatoire",
  },
  image: {
    type: String,
    required: "ce champs est obligatoire",
  },
  body:{
    type: String,
    required: "ce champs est obligatoire"
  },
  date:{
    type: Date,
    default: Date.now,
  },
  // comments:[
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: 'Comment', // Remplacez 'Comment' par le nom de votre modèle de commentaire
  //   },
  // ],

});




Post = mongoose.model('Post', postSchema);

module.exports = Post;
