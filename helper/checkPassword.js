"use strict"
const bcrypt = require('bcrypt');


function checkPassword(password, hash) {
    return bcrypt.compareSync(password, hash)
}

// console.log(checkPassword("1234"))
module.exports = checkPassword
