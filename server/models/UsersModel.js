const mongoose = require('mongoose');

const schema = mongoose.Schema;
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    eMailId: {
        type: String,
        required: true,
    },
    userDetails: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }

    
});


module.exports = mongoose.model('Users', userSchema);