//jshint esversion:6

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const edits = require(__dirname+"/utils/edits.js");

const app = express();

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikidb", {useNewUrlParser: true});

const articleSchema = new mongoose.Schema({
  title: String,
  titleLower: String,
  content: String
});

const Article = mongoose.model("Article", articleSchema);

app.route("/articles")
.get(function(req,res){

  Article.find({}, function(err, articles){
    if(err) console.log(err);
    else {
      if (articles) {
        console.log(articles);
        res.send(articles);
      } else {
        res.send("no articles found");
      }
    }
  });

}).post(function(req,res){

  let title = req.body.title;
  let titleLower = title.toLowerCase();
  let content = req.body.content;

  console.log(title);
  console.log(titleLower);
  console.log(content);

  const article = new Article({
    title: title,
    titleLower: titleLower,
    content: content
  });

  article.save(function(err){
    if (!err) {
      res.status(200).send("successfully added new article");
    } else {
      res.send(err);
    }
  });

}).delete(function(req,res){

  Article.deleteMany({}, function(err){
    if(!err){
      res.status(200).send("successfully deleted all articles");
    } else {
      res.send("error!");
    }
  });

});

app.route("/articles/:articleTitle")
.get(function(req,res){
  Article.findOne({titleLower: req.params.articleTitle.toLowerCase()}, function(err, article){
    if(err) {
      console.log(err);
      res.send(err);
    } else {
      if(article){
        console.log(article);
        res.send(article);
      } else {
        res.send("no articles found");
      }
    }
  });
}).put(function(req, res){
  Article.update(
    {titleLower: req.params.articleTitle.toLowerCase()},
    {title: req.body.title, titleLower: req.body.title.toLowerCase(), content: req.body.content},
    {overwrite: true},
    function(err, result){
      if(err) {
        console.log(err);
        res.send("error!");
      }else {
        if(result){
          res.status(200).send(result);
        }else {
          res.send("no article found to update");
        }
      }
    }
  );
}).patch(function(req,res){
  Article.update(
    {titleLower: req.params.articleTitle.toLowerCase()},
    {$set: edits.editBody(req.body)},
    function(err, result){
      if(err){
        console.log(err);
        res.send("error!");
      } else {
        if(result){
          res.status(200).send(result);
        }else {
          res.send("no article found to update");
        }
      }
    }
  );
}).delete(function(req, res){
  Article.deleteOne({titleLower: req.params.articleTitle.toLowerCase()}, function(err,result){
    if(err){
      console.log(err);
      res.send("error!");
    } else {
      if(result){
        res.status(200).send(result);
      }else {
        res.send("no article found to delete");
      }
    }
  });
});

app.listen(3000, function(){
  console.log("Server is running on port 3000");
});
