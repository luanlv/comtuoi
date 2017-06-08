var express = require('express');
var router = express.Router();
const fileUpload = require('express-fileupload');
const path = require('path');
var sizeOf = require('image-size');
var fs = require('fs');
var Gm = require("gm")
//mongodb

const mongoose = require('mongoose')
const Image = mongoose.model('Image')

router.use(fileUpload())

router.post('/image', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
  let image = req.files.image;

  let id = randomString(10)
  let fileName = id + '-' + image.name
  image.mv(path.join(__dirname , '../images', fileName), function(err) {
    if (err)
      return res.status(500).send(err);
    let dimensions = sizeOf(image.data);
    let data = {
      slug: id,
      name: fileName,
      type: image.mimetype,
      dimensions: dimensions,
      userUpload: 'admin'
    }
    Image.create(
      data
      , (err, image) => {
        if(err) return res.status(400).send("database error")
        res.send(image)
    })
  });
});


router.post('/imageCKEditor', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
  let image = req.files.upload;
  let id = randomString(10)
  let fileName = id + '-' + image.name
  let pathWithName = path.join(__dirname , '../images', fileName)
  let pathWithName2 = path.join(__dirname , '../images', 'test.jpg')
  let watermark = path.join(__dirname , '../images', 'watermark.png')
  image.mv(pathWithName, function(err) {
    if (err)
      return res.status(500).send(err);
    Gm(pathWithName)
      .draw(['image over 0,0 0,0 ' + watermark])
      .write(pathWithName, function (err) {
      if(err) console.log(err)
    })
    let dimensions = sizeOf(image.data);
    let data = {
      slug: id,
      name: fileName,
      type: image.mimetype,
      dimensions: dimensions,
      userUpload: 'admin'
    }
    Image.create(
      data
      , (err, image) => {
        if(err) return res.status(400).send(
          {
            uploaded: 0,
            error: {
              message: 'error'
            }
          }
        )
        res.send({
          uploaded: 1,
          fileName: image.name,
          url: '/image/' + image.name
        })
      })
  })
});

router.post('/imageFroala', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
  let image = req.files.image;
  let id = randomString(10)
  let fileName = id + '-' + image.name
  image.mv(path.join(__dirname , '../images', fileName), function(err) {
    if (err)
      return res.status(500).send(err);
    let dimensions = sizeOf(image.data);
    let data = {
      slug: id,
      name: fileName,
      type: image.mimetype,
      dimensions: dimensions,
      userUpload: 'admin'
    }
    Image.create(
      data
      , (err, image) => {
        if(err) return res.status(400).send(
          {
            uploaded: 0,
            error: {
              message: 'error'
            }
          }
        )
        res.send({
          link: '/image/' + image.name
        })
      })
  });
});

router.post('/imageEditor', function(req, res) {
  var img = req.body.img
  var data = img.replace(/^data:image\/\w+;base64,/, "");
  var buf = new Buffer(data, 'base64');
  let dimensions = sizeOf(buf);
  if(req.body.override) {
    var pathImage = path.join(__dirname, '../images', req.body.name)
    var pathImageSmall = path.join(__dirname, '../images-small', req.body.name)
    fs.writeFile(pathImage, buf, (err) => {
      if (err) return res.status(400).send('error')
      Image.update({slug: req.body.slug}, {
        $set: {
          dimensions: dimensions,
          type: "image/png",
          created_at: Date.now()
        }
      }).exec((err, resData) => {
        if (err) return res.status(400).send('error')
        fs.unlinkSync(pathImageSmall)
        res.send(resData)
      })
    });
  } else {
    let id = randomString(10)
    let fileName = id + '-' + req.body.name
    var pathImage = path.join(__dirname , '../images', fileName)
    fs.writeFile(pathImage, buf, (err) => {
      if (err) return res.status(400).send('error')
      let data = {
        slug: id,
        name: fileName,
        type: "image/png",
        dimensions: dimensions,
        userUpload: 'admin'
      }

      Image.create(data, (err, image) => {
        if(err) return res.status(400).send(
          {
            uploaded: 0,
            error: {
              message: 'error'
            }
          }
        );
        return res.send('ok')
      })
    });
  }

});

module.exports = router;

function randomString(len, charSet) {
  charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var randomString = '';
  for (var i = 0; i < len; i++) {
    var randomPoz = Math.floor(Math.random() * charSet.length);
    randomString += charSet.substring(randomPoz,randomPoz+1);
  }
  return randomString;
}

