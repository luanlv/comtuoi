let mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var schema = new mongoose.Schema({
  category: String,
  slug: { type:String, required:true, unique: true, index: true},
  title: String,
  public: {type: Boolean, default: false},
  coverUrl: String,
  description: String,
  body: String,
  view: {type: Number, default: 0},
  tags:[Schema.Types.Mixed],
  created_at: {type: Date, default: Date.now},
});

let model = mongoose.model('Post', schema);

module.exports = model;

// get ( news )

module.exports.getNews = (root, {page}) => {
  let listCategoryInNews = [
    'su-kien',
    'tin-tuc-tong-hop'
  ]

  return new Promise((resolve, reject) => {

    model.count({category: {$in: listCategoryInNews}}).exec((err, count) => {
      if(err) return reject(err)
      model.find({category: {
        $in: listCategoryInNews
      }}).sort({created_at: -1}).skip((page-1)*16).limit(16).exec((err, res) => {
        err ? reject(err) : resolve({
          page: page,
          totalPage: Math.floor(count/16) + 1,
          data: res
        });
      });

    })
  });
};

module.exports.getNewsInCategory = (root, {page, slug}) => {

  return new Promise((resolve, reject) => {

    model.count({category: slug}).exec((err, count) => {
      if(err) return reject(err)
      model.find({category: slug}).sort({created_at: -1}).skip((page-1)*16).limit(16).exec((err, res) => {
        err ? reject(err) : resolve({
          page: page,
          totalPage: Math.floor(count/16) + 1,
          data: res
        });
      });

    })
  });
};

module.exports.getOnePost = (root, {slug}) => {
  return new Promise((resolve, reject) => {
    model.findOne({slug: slug}).exec((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};

// get ( food )

module.exports.getFoodNews = (root, {page}) => {
  let listCategoryInNews = [
    'mon-ngon-tu-com',
    'cach-lam-mon-ngon-tai-nha'
  ]
  return new Promise((resolve, reject) => {
    model.count({category: {$in: listCategoryInNews}}).exec((err, count) => {
      if(err) return reject(err)
      model.find({category: {
        $in: listCategoryInNews
      }}).sort({created_at: -1}).skip((page-1)*16).limit(16).exec((err, res) => {
        err ? reject(err) : resolve({
          page: page,
          totalPage: Math.floor(count/16) + 1,
          data: res
        });
      });

    })
  });
};

// mutation

module.exports.newPost = (root, {category, slug, title, coverUrl, description, body, tags}) => {
  let data = {
    category,
    slug,
    title,
    coverUrl,
    description,
    body,
    tags
  }
  return new Promise((resolve, reject) => {
    model.create(data, (err, res) => {
      err ? reject(err): resolve(res);
    });
  });

};
