let mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var schema = new mongoose.Schema({
  name: {type: String, default: ''},
  phone: {type: String, default: ''},
  address: {type: String, default: ''},
  product: {type: String, default: ''},
  quantity: {type: String, default: ''},
  done: {type: Boolean, default: false},
  created_at: {type: Date, default: Date.now},
});

let model = mongoose.model('Order', schema);

module.exports = model;

// get ( product )



module.exports.getOrders = (root, {}) => {
  return new Promise((resolve, reject) => {
    model.find({}).sort({created_at: -1}).exec((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};

