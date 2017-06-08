let mongoose = require('mongoose')

var schema = new mongoose.Schema({
  id: { type:String },
  ssr: {type: Boolean, default: true },
  css: {type: String, default: '' },
  adminId: {type: String, default: '100004231235930'},
  emailAdmin: {type: String, default: 'luanlv2591@gmail.com'},
  scriptTop: {type: String, default: '' },
  scriptBottom: {type: String, default: '' }
  },
  {
    collection : 'setting'
  }
);

let model = mongoose.model('Setting', schema);

module.exports = model;


module.exports.getSetting = () => {
  return new Promise((resolve, reject) => {
    model.findOne({}).exec((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};

module.exports.update = (root, {ssr}) => {
  let query = {}
  if(ssr !== undefined) query.ssr = ssr
  return new Promise((resolve, reject) => {
    model.findOneAndUpdate(
      { id: 'setting' },
      { $set: query },
      { returnNewDocument: true, new: true }
    ).exec((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};
