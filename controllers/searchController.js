// Contrôleur pour rechercher des articles par titre ou contenu
exports.searchArticles = async (req, res) => {
    const searchTerm = req.query.term;
  
    try {
      if (!searchTerm) {
        return res.status(400).json({ error: 'Le terme de recherche est manquant' });
      }
  
      const articles = await Post.find({
        $or: [
          { title: { $regex: searchTerm, $options: 'i' } },
          { body: { $regex: searchTerm, $options: 'i' } },
        ],
      });
  
      if (articles.length === 0) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      res.json({ articles });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de la recherche des articles' });
    }
  };
  