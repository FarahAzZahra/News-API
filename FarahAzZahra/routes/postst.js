const router = require('express').Router();
const User = require('../model/User');
const verify = require('./verifyToken');
router.get('/',verify, (req,res)=>{
    res.send(req.user);
    res.send(res.header('auth-token'));
});
module.exports = router;