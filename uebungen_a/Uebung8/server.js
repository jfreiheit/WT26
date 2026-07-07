const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')
require('dotenv').config()

const app = express();
const PORT = 3000;

app.use(express.json())
app.use('/api', routes)

//connect to MongoDB
mongoose.connect(process.env.DB_CONNECTION_ATLAS, { dbName: process.env.DATABASE } )   // Atlas
// mongoose.connect(process.env.DB_CONNECTION_MAC)   // lokal

const db = mongoose.connection;

db.on('error', (error) => console.log(error));
db.once('open', () => {
  console.log('connected to DB')
});

app.listen( PORT, (error) => {
  if(error) {
    console.log(error)
  } else {
    console.log(`Server started and listening on port ${PORT}`)
  }
})