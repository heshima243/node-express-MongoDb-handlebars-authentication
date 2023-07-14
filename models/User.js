const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const validator = require('validator')



const userSchema = new Schema({


  fullname: {
    type: String,
    required: "ce champs est obligatoire"
  },

  email: {
    type: String,
    required: "ce champs est obligatoire",
    unique: true,
    lowercase: true,
    trime: true,
    // validate(v) {
    //   if (!validator.isEmail(v)) throw new Error("Email non valide");
    // },
    
  },
  password: {
    type: String,
    required: "ce champs est obligatoire"
  },

  authTokens:[{
    authToken:{
      type:String,
      required:true
    }
  }]
  
});

userSchema.methods.generateAuthTokenAndSaveUser = async function() {
  const authToken = jwt.sign({ _id:this._id.toString()},'foo');
  this.authTokens.push({ authToken });
  await this.save();
  // return authToken;
}

userSchema.statics.findUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("email ou mot de passe incorrecte");
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) throw new Error("email ou mot de passe incorrecte");
    return user
  
};

userSchema.pre("save", async function () {
  if (this.isModified("password"))
    this.password = await bcrypt.hash(this.password, 8);
});


User = mongoose.model('User', userSchema);

module.exports = User;
