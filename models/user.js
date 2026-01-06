const mongoose=require('mongoose');

const {Schema,model}=mongoose;

//here we will create the schema object of the user 
//and there is a relation between tables and that cause each user will have its own todolists

const userSchema=new Schema({
name:String,
email: {//and this is for data integirty 
  type: String,
  unique: true,
  lowercase: true,
  trim: true
},
password:String,
token:String
},{
  //and be careful it is a timestamps not timestamp
  timestamps:true//and that for adding by default the created at and the update at 
});

//and then this schema object i made i will publish it as a model object
const User=model('User',userSchema);

module.exports=User;