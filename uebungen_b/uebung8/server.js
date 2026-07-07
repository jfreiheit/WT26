const express = require('express');
const userRoutes = require('./routes/userRoutes');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/users', userRoutes);

// connect to mongoDB
mongoose.connect(process.env.DB_CONNECTION_ATLAS, { dbName: process.env.DATABASE });
// mongoose.connect(process.env.DB_CONNECTION_MAC ); // LOKAL
const db = mongoose.connection;
db.on('error', err => {
  console.log(err);
});
db.once('open', () => {
    console.log('connected to DB');
});

app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Server started and listening on port ${PORT} ... `);
    }
});