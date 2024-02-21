const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb+srv://khushi:khushi30@cluster0.exee682.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Define schema
const Schema = mongoose.Schema;
const ContactSchema = new Schema({
    name: String,
    email: String,
    message: String
});
const Contact = mongoose.model('Contact', ContactSchema);

// Routes
app.get('/', (req, res) => {
    res.render('index', { title: 'Express' });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

app.get('/student', (req, res) => {
    res.render('student', { title: 'Student' });
});

app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact' });
});

app.post('/contact', (req, res) => {
    const newContact = new Contact({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    });
    newContact.save()
        .then(() => {
            res.redirect('/contact');
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error saving contact message');
        });
});

module.exports = app;
