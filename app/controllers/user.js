/**
 * Created by Administrator on 2015/6/20.
 */

var User = require('../models/user');

exports.signup = function(req, res){
  var _user = req.body.user;

  User.findOne({name: _user.name}, function(err, user){
    if(err){
      console.log(err);
    }
    if(user){

      console.log('用户已存在啦');
      return res.redirect('/signin');
    }else{
      var user = new User(_user);
      user.save(function(err, user){
        if(err){
          console.log(err);
        }
        res.redirect('/admin/userlist');
      });
    }
  });
}

exports.signin = function(req, res){
  var _user = req.body.user;
  var name = _user.name;
  var password = _user.password;
  console.log('登录用户的name: ' + name);
  User.findOne({"name": name}, function(err, user){
    console.log('登录返回的用户: ' + user);
    if(err){
      console.log(err);
    }
    if(!user){
      console.log('用户不存在');
      return res.redirect('/signup');
    }
    user.comparePassword(password, function(err, isMatch){
      if(err){
        console.log(err);
      }
      if(isMatch){
        console.log('session成功');
        req.session.user = user;
        res.redirect('/');
      }else{
        console.log('Password is not matched');
        res.redirect('/signin');
      }
    });
  });
}
//userlist
exports.list = function(req, res){
  User.fetch(function (err, users) {
    if (err) {
      console.log(err);
    }
    res.render('userlist', {
      title: '用户 列表',
      users: users
    });
  });
}

exports.logout = function(req, res){
  delete req.session.user;
  //delete app.locals.user;
  res.redirect('/');
}

exports.showSignin = function(req, res){
  res.render('signin', {
    title: '登录页面'
  });
}

exports.showSignup = function(req, res){
  res.render('signup', {
    title: '注册页面'
  });
}

//midware for user
exports.signinRequired = function(req, res, next){
  var user = req.session.user;
  if(!user){
    return res.redirect('/signin');
  }
  next();

}

//midware for user
exports.adminRequired = function(req, res, next){
  var user = req.session.user;
  if(user.role <= 10){
    return res.redirect('/signin');
  }
  next();

}

exports.notSignin = function(req, res, next){
  var user = req.session.user;
  if(user){
    return res.redirect('/');
  }
  next();
}
