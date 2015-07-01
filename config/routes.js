/**
 * Created by Administrator on 2015/6/20.
 */

var _ = require('underscore');

//控制器
var Index = require('../app/controllers/index');
var Movie = require('../app/controllers/movie');
var User = require('../app/controllers/user');
var Comment = require('../app/controllers/comment');

module.exports = function(app){

  app.use(function(req, res, next){
    var _user = req.session.user;
    app.locals.user = _user;
    next();

  });
  //首页
  app.get('/', Index.index);

  //Movie
  app.get('/movie/:id', Movie.detail);
  app.get('/admin/movie/new',User.signinRequired, User.adminRequired, Movie.new);
  app.get('/admin/movie/update/:id',User.signinRequired, User.adminRequired, Movie.update);
  app.post('/admin/movie',User.signinRequired, User.adminRequired, Movie.save);
  app.get('/admin/movie/list',User.signinRequired, User.adminRequired, Movie.list);
  app.delete('/admin/movie/list',User.signinRequired, User.adminRequired, Movie.del);

  //User
  app.post('/user/signup', User.signup);
  app.get('/admin/user/list',User.signinRequired, User.adminRequired, User.list);
  app.post('/user/signin', User.signin);
  app.get('/logout', User.logout);
  app.get('/signin',User.notSignin , User.showSignin);
  app.get('/signup',User.notSignin , User.showSignup);

  //Comment
  app.post('/user/comment', User.signinRequired, Comment.save);
};
