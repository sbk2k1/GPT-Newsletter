const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const newsletterSchema = new Schema({
 titles: [{
  type: String,
 }],
 bodies: [{
  type: String,
 }],
}, {
 timestamps: true,
}
);

let Newsletter = mongoose.model('Newsletter', newsletterSchema);

module.exports = Newsletter;