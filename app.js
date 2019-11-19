"use strict"

const app = require('express')();
const routes = require('./routes');

//  Connect all our routes to our application
app.use('/', routes);
app.set("view engine", "ejs")

//helper
// app.locals.helper = (score) => {
//     let Score = parseInt(score)
//     if (!Score) {
//         return "empty"
//     } else {
//         if (Score > 85) return "A"
//         if (Score > 70) return "B"
//         if (Score > 55) return "C"
//         if (Score <= 55) return "E"
//     }
// }

// Turn on that server!
app.listen(3000, () => {
    console.log('App listening on port 3000');
});