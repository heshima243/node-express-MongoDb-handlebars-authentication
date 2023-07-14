const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/verifyToken')

// Affichage du page d'accueille
router.get('/',authController.getHome)

// Affichage du formulaire de login
router.get('/login', authController.getLogin);

// Affichage du formulaire de logup
router.get('/logup', authController.getLogup);

// Gestion de la soumission du formulaire de logup
router.post('/logup', authController.postLogup);

// Gestion de la soumission du formulaire de login
router.post('/login', authController.postLogin);

// Affichage du dashboard
router.get('/dashboard', verifyToken, authController.getDashboard);

// Affichage de tout les utilisateur inscri
router.get('/list',verifyToken, authController.getList);

// mettre en jours de tout les utilisateur inscri
router.get('/list/:id',verifyToken, authController.getList);

// Déconnexion de l'utilisateur
router.get('/logout', authController.logout);


// le post et le get pour le mise en jour des donnees
router.get("/updateList/:id", authController.getUpdateList);
router.post('/updateList/:id',authController.postUpdateList);

router.get("/delete/:id", authController.getDelete);
















module.exports = router;
