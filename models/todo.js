const mongoose=require('mongoose');
//just give attention this is a very important note that schema is with capital s 
const {Schema,model}=mongoose;

//now making schema object for the todo
//this todo will having reference key to the suer that making this todo
const todo= new Schema({
title:String,
description:String,

author:{
  type: Schema.Types.ObjectId,
  ref: 'User',//and it is must matching the name we export the user model
  required: true,
}
},{
  timestamps:true
});

//and now lets make the schema model
//and give attention that the model is a mongoose function not schema function
const toDo=model('toDo',todo);

module.exports=toDo;