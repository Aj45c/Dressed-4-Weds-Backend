const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
const cartRoutes = require('./routes/cartRoutes');


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



//ROUTES---------------------------------
app.get('/', (req, res) => {
    res.send("Hey!")
});

app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);

app.listen(PORT, () => { console.log(`Listening on port:${PORT}`)});