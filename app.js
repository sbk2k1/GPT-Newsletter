require('dotenv').config();
require('./Mongo/connection');
const cron = require('node-cron');
const sendEmail = require('./Email/Email.js');


cron.schedule('25 10 * * 1', () => {
  //console.log('Every monday at 10:25 am I will...');
  // send email to everyone
  sendEmail();
});