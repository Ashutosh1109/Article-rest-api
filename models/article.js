const mongoose=require('mongoose');

const articleSchema= new mongoose.Schema({
  title:{
    type:String,
    required:[true,'give title to your post']
  },
  content:{
    type:String,
    required:[true,'give content to your post']
  }

});
module.exports=Article=mongoose.model('article',articleSchema);
