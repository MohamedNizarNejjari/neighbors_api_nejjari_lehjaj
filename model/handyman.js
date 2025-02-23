let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let HandyManSchema = Schema({
    userId: { type: Number, unique: true, required: true }, 
    name: String,
    avatarUrl: String,
    address: String,
    phoneNumber: String,
    aboutMe: String,
    favorite: Boolean,
    facebookUrl: String,
    linkedinUrl: String,
});

module.exports = mongoose.model('HandyMan', HandyManSchema);
