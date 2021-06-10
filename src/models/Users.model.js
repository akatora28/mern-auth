const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
    // MongoDB will create _id (ObjectID) field by default
    email: {
        type: String,
        unique: true // Don't allow people to sign up multiple times with the same email
    },
    password: {
        type: String,
        select: false // Will prevent 'password' from being returned in default Mongoose Object
    }
},{timestamps: true}) // Add createdAt, updatedAt fields automatically

module.exports = mongoose.model('User', UserSchema);