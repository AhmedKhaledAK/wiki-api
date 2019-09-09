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

app.listen(3000, function(){
  console.log("Server is running on port 3000");
});
