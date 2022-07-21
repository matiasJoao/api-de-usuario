const mongoose = require('../DataBase/index');
const crypt = require('bcryptjs');



const userdb = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true
        
    },

    password: {
        type: String,
        require: true, 
        select: false
    },

    date: {
        type: Date,
        default: Date.now
    }, 
});

userdb.pre('save',  async function(next){
    const incript = await crypt.hash(this.password, 10);
    this.password = incript;
    next();
});
const user = mongoose.model('user', userdb);

module.exports = user;
