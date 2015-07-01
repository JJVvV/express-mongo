
var Comment = require('../models/comment');

exports.save = function(req, res){
 var _comment = req.body.comment;
  var movieId = _comment.movie;
  var comment = new Comment(_comment);
  console.log('comment.from: '+ comment.from);
  comment.save(function(err, movie){
    if(err){
      console.log(err);
    }
    res.redirect('/movie/' + movieId);
  });
};
