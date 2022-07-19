const mongoose = require('../DataBase/index');

const userdb = new mongoose.Schema({
    name : {
        type: String,
        require: true
    },
    email : {
        type: String,
        require: true,
        unique: true,
        lowercase: true
        
    },

    password : {
        type: String,
        require: true, 
        select: false
    },

    date : {
        type: Date,
        default: Date.now
    }, 
});

const user = mongoose.model('user', userdb);

module.exports = user;
