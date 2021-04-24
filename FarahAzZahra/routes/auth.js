const router = require('express').Router();
const User = require('../model/User');
const {registerValid, loginValid} = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require ('jsonwebtoken');
const verify = require('./verifyToken');

//fetch data from req post
router.post('/register', async (req,res)=>{
    //VALIDATE THE DATA BEFORE WE A USER
    const {error} = registerValid(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Checking if the user is already in the database
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exist');

    //HASH THE PASSWORDS
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try{
        const savedUser = await user.save();
        res.send({message: "success",data: user});
    }catch(err){
        res.status(400).send(err);
    }
});

//LOGIN
router.post('/login', async (req,res) => {
    //VALIDATE THE DATA BEFORE WE A USER
    const {error} = loginValid(req.body);
    if(error) return res.status(400).send(error.details[0].message);
        //Checking if the email exist
        const user = await User.findOne({email: req.body.email});
        if(!user) return res.status(400).send('Email is not found');
        //PASSWORD IS CORRECT
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if(!validPass) return res.status(400).send('Invalid password');
        
        //Create and assign a TOKEN
        const token = jwt.sign(
            {
                _id: user._id, name: user.name
            }, 
            process.env.TOKEN_SECRET, 
            {
                expiresIn: "1h"
            });
        res.header('auth-token', token).send({message: "success", token: token});
        //res.send('Logged in');

});

//Logout
router.get('/logout', verify, async (req,res)=>{
    try{
        res.send({message: 'logout successed'});
    }catch(err){
        res.status(401).send(err);
    }
});

//DELETE
router.delete('/:id', async (req,res)=>{
    try{
        const authDelete = await User.deleteOne({_id: req.params.id})
        res.json(authDelete)
    }catch(err){
        res.json({message: err})
    }
})

//DELETE
router.delete('/', async (req,res)=>{
    try{
        const authDelete = await User.deleteMany()
        res.json(authDelete)
    }catch(err){
        res.json({message: err})
    }
})

module.exports = router;