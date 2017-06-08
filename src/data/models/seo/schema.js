let mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var schema = new mongoose.Schema({
  url: {type: String, default: ''},
  title: {type: String, default: ''},
  description: {type: String, default: ''},
  og_title:  {type: String, default: ''},
  og_image: {type: String, default: ''},
  og_description: {type: String, default: ''},
  created_at: {type: Date, default: Date.now},
});

let model = mongoose.model('Seo', schema);

module.exports = model;

// get ( product )

module.exports.getByUrl = (root, {url}) => {
  return new Promise((resolve, reject) => {
    model.findOne({url: url}).exec((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};

module.exports.getAllSeo = (root, {filter}) => {
  let query = {}
  if(filter) query.url = {$regex: new RegExp(filter, "ig")}
  return new Promise((resolve, reject) => {
    model.find(query).sort({created_at: -1}).exec((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};

