var mongoose = require("mongoose")
let autoIncrement = require('mongoose-auto-increment')
autoIncrement.initialize(mongoose.connection)

module.exports = autoIncrement;
