'use strict'

require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);




mongoose
    .connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology:true})
        .then( mongoEntry => {
            console.log(`Connected to Mongo! Database name: "${mongoEntry.connections[0].name}"`)
        })
        .catch(err => {
            console.error('Error connecting to mongo', err)
        });

const app = express (); 

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
// add favicon insert here <<<---

app.locals.title = 'Epic-planner';

app.use(
        session({                                   //// cookie is a saved session
            secret: process.env.SESSION_SECRET,  
            resave: true,
            saveUninitialized: false,
            store: new MongoStore ({ 
                mongooseConnection: mongoose.connection, 
                ttl: 60 * 60 * 24 
            }),
        }),
);

const index = require('./routes/index');
app.use('/', index);

module.exports = app;

