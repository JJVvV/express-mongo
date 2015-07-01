
var Movie = require('../models/movie');
var Comment = require('../models/comment');

var _ = require('underscore');

exports.detail = function(req, res){
  var id = req.params['id'];
  Movie.findById(id, function(err, movie){
   // console.log('****************** movie' + movie);
    if(err){
      console.log(err);
    }
    Comment.find({movie: id}).populate('from', 'name').exec(function(err, comments){
     // console.log('typeof comments: ' + Object.prototype.toString.call(comments));
      res.render('detail', {
        title: '猎头小狼 详情',
        movie: movie,
        comments: comments
      });
    });

  });
};

exports.new =  function(req, res){
  res.render('admin', {
    title: '猎头小狼 后台录入页',
    movie:{
      title:'',
      doctor:'',
      country:'',
      year:'',
      poster:'',
      flash:'',
      summary:'',
      language:'',
      _id:''
    }
  });
};

exports.update =  function(req, res){
  var id = req.params.id;
  if(id){
    Movie.findById(id, function(err, movie){
      res.render('admin', {
        title: '猎头小狼 后台录入页',
        movie: movie
      });
    });
  }
};

exports.save = function(req, res){
  var id = req.body.movie._id;
  var movieObj = req.body.movie;
  var _movie;
  console.log('id ****************: ' + id);
  console.log('typeof id: ' + (typeof id));
  if(id){
    Movie.findById(id, function(err, movie){
      if(err){
        console.log(err);

      }
    //  console.log('movie **************: ' + movie);
      _movie = _.extend(movie, movieObj);
      console.log('_movie.title ***************' + movieObj.title);
   //   console.log(_movie);
      _movie.save(function(err, movie){
        if(err){
          console.log(err);
        }
        res.redirect('/movie/' + movie._id);
      });
    });
  }else{
    _movie = new Movie({
      doctor: movieObj.doctor,
      title: movieObj.title,
      country: movieObj.country,
      language: movieObj.language,
      year: movieObj.year,
      poster: movieObj.poster,
      summary: movieObj.summary,
      flash: movieObj.flash
    });
    _movie.save(function(err, movie){
      if(err){
        console.log(err);
      }
      res.redirect('/movie/' + movie._id);
    });

  }
};
exports.list = function(req, res){
  Movie.fetch(function(err, movies){
    if(err){
      console.log(err);
    }
    res.render('list', {
      title: '猎头小狼 列表',
      movies: movies
    });
  });
};

exports.del = function(req, res){
  var id = req.query.id;
  if(id){
    Movie.remove({_id: id}, function(err, movie){
      if(err){
        console.log(err);
      }else{

        res.json({success: 1});
      }

    });
  }
};