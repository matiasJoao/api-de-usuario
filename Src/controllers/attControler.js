const express = require ('express');
const userdb = require('../Models/user');
const router = express.Router();

router.post('/register', async (req, res)=> {
    try {
        const user = await userdb.create(req.body);
        return res.send({user});
    }
    catch (err){
        return res.status(400).send({error: 'falha no registro'});
    };
});

module.exports = app => app.use('/att', router);