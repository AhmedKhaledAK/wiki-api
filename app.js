//jshint esversion:6

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");

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

app.get("/articles", function(req, res){
  Article.find({}, function(err, articles){
    if(err) console.log(err);
    else {
      res.send(articles);
      console.log(articles);
    }
  });
});

app.post("/articles", function(req, res){
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
});

app.listen(3000, function(){
  console.log("Server is running on port 3000");
});
