const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userController = require('./controllers/userController');

//----------------------------------------------------------
const app = express();

require('dotenv').config();

//Middleware-------------------------------------------------
const { PORT = 4000, MONGODB_URL} = process.env;

mongoose.connect(MONGODB_URL);

mongoose.connection
.on('connected', () => console.log('Connected to MongoDB'))
.on('error', (err) => console.log('Error with MongoDB: ' + err.message))


app.use(cors());
app.use(express.json());


//---------------------------------
app.get('/', (req, res) => {
    res.send("Hey!")
});

app.use('/NewUser', userController.newUser);
app.use('/Login', userController.userLogin)

app.listen(PORT, () => { console.log(`Listening on port:${PORT}`)});