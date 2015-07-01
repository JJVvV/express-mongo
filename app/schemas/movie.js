/**
 * Created by Administrator on 2015/6/14.
 */

var mongoose = require('mongoose');

var MovieSchema = new mongoose.Schema({
  doctor: String,
  title: String,
  language: String,
  country: String,
  summary: String,
  flash: String,
  poster: String,
  year: String,
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

MovieSchema.pre('save', function(next){
  if(this.isNew){
    this.meta.createAt = this.meta.updateAt = Date.now();
  }else{
    this.meta.updateAt = Date.now();
  }
  next()
});
//这些方法只有model实例化后的实例才会具有此方法
MovieSchema.statics = {
  fetch: function(cb){
    return this.find({})
      .sort('meta.updateAt')
      .exec(cb)
  },

  findById: function(id, cb){

    //var objId = mongoose.Types.ObjectId(id);
    //console.log(objId);
   var result = this.findOne({_id:id})
      .exec(cb);
    console.log('**********result: ' + result.title);
    return result;

  }
};

module.exports = MovieSchema;