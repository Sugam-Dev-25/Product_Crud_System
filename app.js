require('dotenv').config();
const express = require('express');
const ejs = require('ejs');
const path = require('path');
const cors= require('cors');
const DatabaseConnection = require('./app/config/db');
const app = express();
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended:true }));

DatabaseConnection();


app.use(express.static('public'));

app.use(express.static(path.join(__dirname, 'public')));
app.use('uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static('uploads'));


const productRoutes = require('./app/router/productRoutes');
app.use(productRoutes);


const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 