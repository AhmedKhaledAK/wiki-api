//jshint esversion:6

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

mongoose.connect("mongodb://localhost:27017/wikidb", {useNewUrlParser: true});

const articleSchema = new mongoose.Schema({
  title: String,
  titleLower: String,
  content: String
});

const Article = mongoose.model("Article", articleSchema);

app.listen(3000, function(){
  console.log("Server is running on port 3000");
});
