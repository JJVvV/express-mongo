/**
 * Created by Administrator on 2015/6/20.
 */
var Movie = require('../models/movie');
exports.index = function(req, res){
  console.log('session.user ' + req.session && req.session.user);

  Movie.fetch(function(err, movies){
    if(err){
      console.log('**************' + err);
    }
    res.render('index', {
      title: '猎头小狼 首页',
      movies: movies
    });
  });
};
