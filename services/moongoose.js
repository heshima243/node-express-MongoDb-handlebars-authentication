require("dotenv").config();
const mongoose = require("mongoose");


connectDb().catch((err) => console.log(err));

async function connectDb() {
     
  await mongoose.connect(process.env.MONGO_URL);


  console.log('BASE DE DONNE connecte');
}

module.exports={
    connectDb
}