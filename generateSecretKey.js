const crypto = require('crypto'); //opens a lego box called crypto and takes out the specific piece called crypto, for cryptographic operations this Node.js module is needed

const secretKey = crypto.randomBytes(32).toString('hex'); //in order to hash we need to generate a secretKey, this a 32 byte sequences of random characters and converts it to a hexadecimal string
console.log(secretKey); //  lets me see the value of the secretKey