const express = require('express');
const router = express.Router();

const searchController = require('../controllers/searchController');



// Route de recherche
router.get('/search', searchController.searchArticles);

module.exports = router;