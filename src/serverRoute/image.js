var express = require('express');
var router = express.Router();
const path = require('path');
const fs = require('fs');
var request = require('request');
var Gm = require("gm")
var utf8 = require('utf8');
var iconv = require('iconv-lite');
const mongoose = require('mongoose')
const Image = mongoose.model('Image')

const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');

router.post('/delete', (req, res) => {
  let pathImage = path.join(__dirname , '../images', req.body.name)
  let pathImageSmall = path.join(__dirname , '../images-small', req.body.name)
  fs.unlinkSync(pathImage)
  Image.remove({slug: req.body.slug}, (err, resData) => {
    if(err) return res.status(400).send('err')
    if (fs.existsSync(pathImage)) {
      fs.unlinkSync(pathImage)
    }
    if (fs.existsSync(pathImageSmall)) {
      fs.unlinkSync(pathImageSmall)
    }
    res.send(resData)
  })
})

router.post('/min/:name', (req, res) => {
  let pathImage = path.join(__dirname , '../images', req.params.name)
  var oldSize = fs.readFileSync(pathImage).byteLength;
  let pathImageFolder = path.join(__dirname , '../images')
  var arrayImg = []
  arrayImg.push(pathImage)
  imagemin(arrayImg, pathImageFolder, {
    plugins: [
      imageminJpegtran(),
      imageminPngquant({quality: '65-80'})
    ]
  }).then(files => {
    res.send({
      oldSize: oldSize,
      newSize: files[0].data.byteLength
    })
    //=> [{data: <Buffer 89 50 4e …>, path: 'build/images/foo.jpg'}, …]
  });
})

router.use('/small/', getSmallImage , express.static(path.join(__dirname , '../images-small')))

router.use('/', express.static(path.join(__dirname , '../images')));

function getSmallImage(req, res, next){
  var imageName = decodeURI(req.path.slice(1))
  var originalPathImage = path.join(__dirname , '../images/', imageName)
  if(!fs.existsSync(originalPathImage)){
    return next()
  }
  var pathImage = path.join(__dirname , '../images-small/', imageName)
  if (fs.existsSync(pathImage)) {
    next()
  } else {
    Gm(originalPathImage).resize(300, "!").write(pathImage, function (err) {
      if(err) next()
      next()
    })
  }
}

router.use('*', (req, res, next) => {
  res.status(404).send('not found!')
})

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

module.exports = router;
