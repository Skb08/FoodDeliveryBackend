const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
// const SECRET = process.env.SECRET
// const JWT_SECRET = `${SECRET}`
// const JWT_SECRET = require('../../config/keys')
const JWT_SECRET = "skb"

router.post("/createuser",
body('email','Incorrect Email').isEmail(),
body('name','Incorrect Name').isLength({min: 5}),
body('password','Incorrect Password').isLength({min: 5})
,async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({error:errors.array()});
    }
    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password,salt);
  
    try{
        await User.create({
            name: req.body.name,
            password: secPassword,
            email: req.body.email,
            location: req.body.location
        })
    res.json({success:true});
    }catch(error){
        console.log(error);
        res.json({success:false})
    }
})

router.post("/loginuser",
body('email','Incorrect Email').isEmail(),
body('password','Incorrect Password').isLength({min: 5})
,async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({error:errors.array()});
    }
    
    let email = req.body.email;
    try{ 
        let userData = await User.findOne({email});
        if(!userData){
            return res.status(400).json({error:"Try loging with correct email"});
        }
        const pwdCompare = await bcrypt.compare(req.body.password,userData.password);
        // console.log(req.body.password);
        // console.log(userData.password);
        // console.log( await bcrypt.compare(req.body.password,userData.password));
        if(!pwdCompare){
            return res.status(400).json({error:"Try loging with correct password"});
        }
        const data = {
            user:{
                id:userData.id
            }
        }
        const authToken = jwt.sign(data,JWT_SECRET)
        return res.json({success:true,authToken:authToken});
    }catch(error){
        console.log(error);
        res.json({success:false})
    }
})

module.exports = router;