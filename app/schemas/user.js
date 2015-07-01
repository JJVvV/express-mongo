/**
 * Created by Administrator on 2015/6/20.
 */


var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var ROUNDS = 10;
var UserSchema = new mongoose.Schema({
  name:{
    type: String,
    unique: true
  },
  password:{
    type: String
  },
  // 0: normal user
  // 1: varified user
  // 2: professional user

  // >10: admin
  // >50: suerp admin
  role:{
     type: Number,
    default:0
  },
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt:{
      type: Date,
      default: Date.now()
    }
  }
});

UserSchema.pre('save', function(next){
  var user = this;
  if(this.isNew){
    this.meta.createAt = this.meta.updateAt = Date.now();
  }else{
    this.meta.updateAt = Date.now();
  }
  bcrypt.genSalt(ROUNDS, function(err, salt){
    if(err) return next(next);
    bcrypt.hash(user.password, salt, null, function(err, hash){
      if(err) return next(err);
      user.password = hash;
      next();
    });
  });
  next()
});
//实例方法

UserSchema.methods = {
  comparePassword: function(_password, cb){
    bcrypt.compare(_password, this.password, function(err, isMatch) {
      if(err) return cb(err);
      cb(null, isMatch);

    });
  }
}
//这些方法模型就可以调用
UserSchema.statics = {
  fetch: function(cb){
    return this.find({})
      .sort('meta.updateAt')
      .exec(cb)
  },

  findById: function(id, cb){
    var objId = mongoose.Types.ObjectId(id);
    var result = this.findOne({_id:id})
      .exec(cb);
    console.log('**********result: ' + result.title);
    return result;

  }
};

module.exports = UserSchema;