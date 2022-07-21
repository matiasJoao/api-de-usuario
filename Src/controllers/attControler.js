const express = require ('express');
const user = require('../Models/user');
const userdb = require('../Models/user');
const router = express.Router();
const crypt = require('bcryptjs');
const tkn = require('jsonwebtoken');
const hash = require('../hash/hash.json')

router.post('/register', async (req, res)=> {
    const {email} = req.body;
    try {
        if(await userdb.findOne({email})){
            return res.status(400).send({error: 'Email ja existe'})
        }
        const user = await userdb.create(req.body);
        user.password = undefined;
        return res.send({user});
       
    }
    catch (err){
        return res.status(400).send({error: 'falha no registro'});
    };
});

router.post('/login', async (req, res)=>{
    const {email, password} = req.body;
    const login = await userdb.findOne({email}).select('+password')

    if(!login){
        return res.status(400).send({error : 'Usuario Nao encontrado'})
    };
    if(!await crypt.compare(password, login.password)){
        return res.status(400).send({error : 'Senha invalida'})
    }
    login.password = undefined;
    const token = tkn.sign({id : login.id}, hash.hash, {expiresIn:86400} )
    res.send({ login, token});
})

module.exports = app => app.use('/att', router);