const express = require('express');
const session = require('express-session');
require("dotenv").config();
const cors = require('cors'); // Import the cors middleware

const postRoutes = require('./routes/postRoutes')
const authRoutes = require('./routes/authRoutes');
const { connectDb } = require('./services/moongoose');

// instaciation d'express
const app = express();
const port = process.env.PORT || 5000;

//appel de connecxion a la base de donne
connectDb().catch((err) => console.log(err));

// Middleware pour le traitement des données de formulaire
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(session({
  secret: 'your-session-secret',
  resave: false,
  saveUninitialized: true
}));


// Use the cors middleware to enable CORS for specific origins
app.use(cors({
  origin: 'https://inquisitive-vacherin-036997.netlify.app/' // Replace with your frontend's URL
}));

// Routes d'authentification
app.use('/', postRoutes);

app.use((req, res) => {
  res.status(404).send('Page not found');
});

// Port d'écoute du serveur
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
