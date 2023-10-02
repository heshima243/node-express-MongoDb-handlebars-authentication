const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Affichage de la première page
exports.getHome = (req, res) => {
  res.json({ message: 'Home' });
};

// Affichage du formulaire de login
exports.getLogin = (req, res) => {
  res.json({ message: 'Login' });
};

// Affichage du formulaire de logup
exports.getLogup = (req, res) => {
  res.json({ message: 'Logup' });
};

// Gestion de la soumission du formulaire de logup
exports.postLogup = async (req, res, next) => {
  const user = new User(req.body);

  try {
    const authToken = await user.generateAuthTokenAndSaveUser();
    res.status(200).json({ authToken });
  } catch (error) {
    handleValidationError(error, req.body);
    res.status(400).json({ error: 'Validation error' });
  }
};

// Gestion de la soumission du formulaire de login
exports.postLogin = async (req, res) => {
  try {
    const user = await User.findUser(req.body.email, req.body.password);

    // Génération du token JWT
    const token = jwt.sign({ userId: user._id }, 'foo');

    // Stockage du token dans la session
    req.session.token = token;

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Invalid credentials' });
  }
};

// Affichage du dashboard
exports.getDashboard = (req, res) => {
  res.json({ message: 'Dashboard', user: req.user });
};

// Récupération de tous les utilisateurs
exports.getList = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).json({ users });
  } catch (e) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Récupération et mise à jour d'un utilisateur
exports.getUpdateList = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json({ user });
  } catch (e) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.postUpdateList = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { fullname, email } = req.body;

    const user = await User.findByIdAndUpdate(id, { fullname, email }, { new: true });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.save();

    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating the data' });
  }
};

// Suppression d'un utilisateur
exports.getDelete = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const user = await User.findByIdAndDelete(userId);

    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (e) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Déconnexion de l'utilisateur
exports.logout = (req, res) => {
  req.session.destroy();
  res.json({ message: 'Logged out' });
};

// Fonction de validation de champs
function handleValidationError(error, body) {
  for (index in error.errors) {
    switch (error.errors[index].path) {
      case 'fullname':
        body['fullnameError'] = error.errors[index].message;
        break;
      case 'email':
        body['emailError'] = error.errors[index].message;
        break;
      case 'password':
        body['passwordError'] = error.errors[index].message;
        break;
    }
  }
}
