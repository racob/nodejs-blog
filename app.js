const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
const dotenv = require('dotenv');

//express app
const app = express();

//connect to mongo db
dotenv.config({path: './bin/.env'});
const dbURI = process.env.APP_DATABASE_URL;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(process.env.APP_PORT))
    .catch((err) => console.log(err));

//register view engine
app.set('view engine','ejs');

//use morgan as middleware and set static files directory
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use((req,res,next) => {
    res.locals.path = req.path;
    next();
})

//home route
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

//about route
app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
});

//blog routes
app.use('/blogs',blogRoutes);

//redirects
app.get('/about-us', (req,res) => {
    res.redirect('/about');
});

//404 page
app.use((req,res) => {
    res.status(404).render('404', {title: '404 Not found'});
});