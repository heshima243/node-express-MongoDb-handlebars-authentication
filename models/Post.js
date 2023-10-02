const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const validator = require('validator')



const postSchema = new Schema({
  
  title: {
    type: String,
    // required: "ce champs est obligatoire",
  },
  image: {
    type: String,
    // required: "ce champs est obligatoire",
  },
  body:{
    type: String,
    // required: "ce champs est obligatoire"
  },
  date:{
    type: Date,
    default: Date.now,
  }

});




Post = mongoose.model('Post', postSchema);

module.exports = Post;
