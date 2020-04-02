//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));


mongoose.connect('mongodb://localhost:27017/wikiDB',{ useNewUrlParser: true });

var Article=require('./models/article');

app.get('/articles',function(req,res){
  Article.find(function(error,found_articles){
    if(error)
    {res.json(error);}
    else {
      res.json(found_articles);
    }
  });
});

app.post('/articles',function(req,res){
  var new_article= new Article({
    title:req.body.title,
    content:req.body.content
  });
  new_article.save(function(error,saved_article){
    if(error)
    {res.json(error.message);}
    else {
      res.json(saved_article);
    }
  });
});

app.delete('/articles',function(req,res){
  Article.deleteMany(function(error){
    if(error)
    {res.json(error);}
    else {
      res.json("successfully deleted all the items");
    }
  });
});

//particular article

app.route('/articles/:article_name')
.get(function(req,res){
  Article.findOne({title:req.params.article_name},function(error,found_article){
    if(error)
    {res.json(error.message);}
    else {
      if(found_article)
      {res.json(found_article);}
      else {
        res.json('no article matched the given title');
      }
    }
  });
})
.put(function(req,res){
  Article.update({title:req.params.article_name},
    {title:req.body.title,content:req.body.content},
    {overwrite:true},
    function(error){
    if(error)
    {res.json(error.message);}
    else {
      res.json('successfully updated');
    }
  });
})
.patch(function(req,res){
  console.log(req.body);
Article.update({title:req.params.article_name},
  {$set:req.body},
  function(error,obj){
    if(error)
    {res.json(error.message);}
    else {

      res.json(obj);
    }
  });
})
.delete(function(req,res){
  Article.deleteOne({title:req.params.article_name},function(error,obj){
    if(error)
    {res.json(error.message);}
    else {
      res.json(obj);
    }
  });
});
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
