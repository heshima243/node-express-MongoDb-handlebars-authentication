const express = require('express');
const session = require('express-session');

const authRoutes = require('./routes/authRoutes');
const {connectDb} = require('./services/moongoose')


const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars').engine;
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

// instaciation d'express
const app = express();

// permet de leve la restrictioin de securite de handlebars pour accede au donne
app.engine('handlebars', expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
// parametre d'acces a nos view
app.set('view engine', 'handlebars');


//appel de connecxion a la base de donne
connectDb().catch((err) => console.log(err));

// Middleware pour le traitement des données de formulaire
app.use(express.json());
app.use(express.urlencoded({
  extended:true
}))



app.use(session({
  secret: 'your-session-secret',
  resave: false,
  saveUninitialized: true
}));




// Routes d'authentification
app.use('/', authRoutes);

app.use((req,res)=>{
  res.render('./404')
})

// Port d'écoute du serveur
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
