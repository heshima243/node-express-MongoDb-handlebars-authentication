const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


// affichage du premier page de notre
exports.getHome=('/',(req,res)=>{
  res.render('./home',{
    viewtitle :"HOME"
  })
})

// Affichage du formulaire de login
exports.getLogin = (req, res) => {
  res.render('./login',{
  viewtitle :"LOGIN"
  });
};

// Affichage du formulaire de logup
exports.getLogup = (req, res) => {
  res.render('./logup',{
    viewtitle :"LOGUP"
    });
};

// Gestion de la soumission du formulaire de logup
exports.postLogup= async (req, res, next) => {

  const user = new User(req.body);

   try {
     const authToken = await user.generateAuthTokenAndSaveUser();
     res.redirect('/login')
   } catch (error) {

     handleValidationError(error,req.body)
     res.status(400).render('logup',{
      viewtitle:"LOGUP",
      authToken:req.body
     });
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

    // Redirection vers le dashboard
    res.redirect('/dashboard')
  } catch (error) {

    console.error(error);
    
    res.render('login',{ error: 'Identifiants invalides',viewtitle:"LOGIN" })
  }
};

// Affichage du dashboard
exports.getDashboard = (req, res) => {
  res.render('./dashboard', { user: req.user,viewtitle:"dashboard" });
  
};

// RECUPERE TOUT LES UTILISATEURS
exports.getList = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.render('list',{users,viewtitle:"LISTE INSCRITS"});
  } catch (e) {
    res.status(500).send(e);
  }
};

// recupe le vue et post de mis en jours-------------------------
exports.getUpdateList= async (req,res,next)=>{
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).send("user not found");
    res.render("./updateList",{user,viewtitle:"UPDATE LIST"});
  } catch (e) {
    res.status(500).send(e);
  }
}
exports.postUpdateList =async (req,res,next)=>{
  try {
    const id = req.params.id;
    const { fullname, email } = req.body;

    const user = await User.findByIdAndUpdate(id, { fullname, email }, { new: true });

    if (!user) {
      return res.status(404).send('User not found');
    }

    await user.save();

    res.redirect("/list");
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating the data.');
  }
}
//-----------------------------------------------------------

// delete ou supprime une donnee
exports.getDelete = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const user = await User.findByIdAndDelete(userId);

    if (!user) return res.status(404).send("user not found");
    res.redirect("/list");
  } catch (e) {
    res.status(500).send(e);
  }
}


// Déconnexion de l'utilisateur
exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('./login');
};

// function de validation de champs
function handleValidationError(error,body){
  for(index in error.errors){
    switch(error.errors[index].path){
      case 'fullname':
          body['fullnameError']=error.errors[index].message;
          break;
      case 'email':
          body['emailError']=error.errors[index].message;
          break;
      case 'password':
          body['passwordError']=error.errors[index].message;
          break;
     
    }  
  }
}



