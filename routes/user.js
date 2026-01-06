//here for the user it will have just 2 endpoints the first for the register and the second for the log in
const express=require('express');
const userController=require('../controllers/user');
const userValidation=require('../validations/user');
const validate=require('../middlewares/validate');
const router= express.Router();

router.post('/register',validate(userValidation.register),userController.register);

router.post('/login',validate(userValidation.signIn),userController.signIn);

module.exports=router;