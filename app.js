"use strict"

const express = require('express')
const app = express()
const routes = require('./routes');
const session = require('express-session')
const secret = { secret: 'keyboard cat', resave: false, saveUninitialized: true, cookie: { secure: true } }

//  Connect all our routes to our application
app.use('/', routes);
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(session(secret))

// Turn on that server!
app.listen(3000, () => {
    console.log('App listening on port 3000');
});