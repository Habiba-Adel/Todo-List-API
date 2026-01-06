const Joi = require('joi');

//and here we just making validate on the create todo and the update todo cause this is the only 2 things ehen the user sent data on the request body
//so we must ensure making validation from them

//here first thing is to making our validation schema
const createTodo = Joi.object({
  title: Joi.string()
    .min(3)     
    .max(100)    
    .required(),
  
  description: Joi.string()
    .min(5)     
    .max(500)   
    .required()
}).options({ allowUnknown: false });//for the security things 


const updateTodo = Joi.object({
  title: Joi.string()
    .min(3)
    .max(100),
  
  description: Joi.string()
    .min(5)
    .max(500)
}).options({ allowUnknown: false });

module.exports = {
  createTodo,
  updateTodo
};


//and here there is an important note that we will not making validation on the author attribute and that why?
/* cause the author is a reference key points to the primary key of the user model which is the object id of the user 
and this the user will not sent it in the requests cause the user is already logged in so we will know who write this todo
using and knowing just the user token but we define the author required in the model of the db?
yes right and until this data go to the db it will be attached automatically the id of the author in this request and this through the middle ware we will make  */