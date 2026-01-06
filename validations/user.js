//this will having the validations schema about the data was sent in the requests of the sign up/log in 
//cause this the user sent data on them and i must validate them first casue maybe there is a bad request existed
// there is a real very interesting point about the emails 
//real applications treat email as case-insensitive.
//so for that we will need to making email normalization before dealing
//Lowercasing is NOT validation
//Lowercasing is normalization

const Joi = require('joi');

const register = Joi.object({
  name: Joi.string()
    .min(5)
    .max(30)
    .required(),

  password: Joi.string()
    .min(8)
    .required(),

    email: Joi.string()
    .email()//this is for checking about the @ and the .com and this things 
    .trim()
    .lowercase()
    .required()
}).options({allowUnknown:false});
//and the options here is to making any request will having any extra fields not existed here or not mentioned here 
//in this validation schema it will making the validation fails and that why?
//its main goal is the security to prevent any attackers for addding any melicious code or trying any not existed attributes
//to get access to unauthorized data


//now lets making the same with the sign in with extra thing validation related to the token comming in the request
const signIn=Joi.object({
  //there is just small note that we put joi just once in the start and then all the rest is .functions names
  email: Joi.string()
  .email().
  trim().
  lowercase()
  .required(),
  password: Joi.string()
  .min(8)
  .required()
}).options({allowUnknown:false});



//now the request will come here first to check about the attributes and other request body things and then 
//after it finish here it going into the next stage which is the middleware of the token to check that the token
//is correct and valid and then the last stage is the route and from it into the controller






module.exports={
  register,
  signIn
}