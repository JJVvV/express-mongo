/**
 * Created by Administrator on 2015/6/14.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var CommentSchema = new mongoose.Schema({
  movie: {type: ObjectId, ref: 'Movie'},
  from: {type: ObjectId, ref: 'User'},
  reply:[{
    from: {type: ObjectId, ref: 'User'},
    to: {type:ObjectId, ref: 'User'},
    content: String
  }],
  content: String,

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

CommentSchema.pre('save', function(next){
  if(this.isNew){
    this.meta.createAt = this.meta.updateAt = Date.now();
  }else{
    this.meta.updateAt = Date.now();
  }
  next()
});
//这些方法只有model实例化后的实例才会具有此方法
CommentSchema.statics = {
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

module.exports = CommentSchema;