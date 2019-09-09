//jshint esversion:6

module.exports.editBody = function(body){
  let bo = {};
  if(body.title && body.content){
    bo ={
      title: body.title,
      titleLower: body.title.toLowerCase(),
      content: body.content
    };
  } else if(body.content){
    bo ={
      content: body.content
    };
  } else if(body.title){
    bo ={
      title: body.title,
      titleLower: body.title.toLowerCase(),
    };
  }
  return bo;
};
