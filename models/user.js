const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  }
})

UserSchema.plugin(passportLocalMongoose) // adding a plugin for username and pasword which has been pre-created through passport

module.exports = mongoose.model('User', UserSchema) //the name to use this schema would be 'User' and UserSchema is our schema