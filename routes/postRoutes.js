const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const postController = require('../controllers/postController')
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/verifyToken')

// Affichage du page d'accueille
router.get('/',postController.getHome)

// Affichage du formulaire de login
router.get('/post',postController.getPost);

// Gestion de la soumission du formulaire de logup
router.post('/post', postController.postPost);

// Affichage de tout les utilisateur inscri
router.get('/list',postController.getList);


// le post et le get pour le mise en jour des donnees
router.get("/updateList/:id", postController.getUpdateList);
router.put('/updateList/:id',postController.putUpdateList);

// delete post
router.get("/delete/:id", postController.getDelete);







module.exports = router;
