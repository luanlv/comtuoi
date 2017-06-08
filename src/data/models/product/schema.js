let mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var schema = new mongoose.Schema({
  // category: String,
  slug: { type:String, required:true, unique: true, index: true},
  name: String,
  // public: {type: Boolean, default: false},
  coverUrl: String,
  price: Number,
  body: String,
  description: String,
  view: {type: Number, default: 0},
  saleOff: {
    type: {type: Number},
    value: {type: Number}
  },
  // tags:[Schema.Types.Mixed],
  created_at: {type: Date, default: Date.now},
});

let model = mongoose.model('Product', schema);

module.exports = model;

// get ( product )


module.exports.getOneProduct = (root, {slug}) => {
  return new Promise((resolve, reject) => {
    model.findOne({slug: slug}).exec((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};


module.exports.getProducts = (root, {}) => {
  return new Promise((resolve, reject) => {
    model.find({}).exec((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};

