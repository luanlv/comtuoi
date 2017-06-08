let mongoose = require('mongoose')

var schema = new mongoose.Schema({
  slug: { type:String, required:true, unique:true, index:true },
  name: String,
  type: String,
  fileSize: {type: Number, default: 0},
  dimensions: {
    width: {type: Number},
    height: {type: Number}
  },
  userUpload: String,
  created_at: {type: Date, default: Date.now},
});

let model = mongoose.model('Image', schema);

module.exports = model;


module.exports.getListImageByTime = (root, {num, time, filter}) => {
  if(!time) time = Date.now()
  let query = {created_at: {$lt: time}}
  if(filter) query.name = {$regex: new RegExp(filter, "ig")}
  console.log(query)
  return new Promise((resolve, reject) => {
    model.find(query).sort({created_at: -1}).limit(num).exec((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};
