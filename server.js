const express = require('express');
const session = require('express-session');
require("dotenv").config();
const cors = require('cors');
const postRoutes = require('./routes/postRoutes');
const authRoutes = require('./routes/authRoutes');
// const commentsRoutes = require('./routes/commentsRoutes');
const researchRoutes = require('./routes/researchRoutes')

const { connectDb } = require('./services/moongoose');

const app = express();
const port = process.env.PORT || 5000;

connectDb().catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'your-session-secret',
  resave: false,
  saveUninitialized: true
}));

app.use(cors({
  origin: ['https://julweb.netlify.app','https://jul-blog.vercel.app'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));

app.use('/api/posts', postRoutes);
// app.use('/api/comments', commentsRoutes);

// Votre route de recherche
app.use('/api/recherche',researchRoutes);

app.use((req, res) => {
  res.status(404).send('Page not found');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
