"use strict"
const bcrypt = require('bcrypt');


function hashPassword(password) {
    const saltRounds = 10;
    const myPlaintextPassword = password;

    const hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
    return hash
}

module.exports = hashPassword