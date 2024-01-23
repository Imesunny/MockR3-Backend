require('dotenv').config();
const mongoose = require('mongoose');

const mongoDBConnection = mongoose.connect('mongodb+srv://Imesa:Imesa121@cluster0.cb366gq.mongodb.net/MockR3');

console.log(mongoDBConnection, 'check')

module.exports = mongoDBConnection