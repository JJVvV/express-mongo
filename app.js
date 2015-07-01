/**
 * Created by Administrator on 2015/6/14.
 */

var express = require('express');
var port = process.env.PORT || 3003;
var path = require('path');
var mongoose = require('mongoose');
var app = express();

app.locals.moment = require('moment');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var morgan = require('morgan')


var dbUrl = 'mongodb://localhost/imooc';
mongoose.connect(dbUrl);
app.set('views', './app/views/pages');
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('body-parser').urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
  secret: 'imooc',
  store: new mongoStore({
    url: dbUrl,
    collection: 'sessions'
  })
}));



if(app.get('env') === 'development'){
  app.set('showStackError', true);
  app.use(morgan(':method :url :status'));
  app.locals.pretty = true;
  mongoose.set('debug', true);
}

require('./config/routes')(app);
app.listen(port, function(){
  console.log('app started on port ' + port);
});


