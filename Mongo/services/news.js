const News = require('../models/news.js');

//create function to save news to database

var saveNews = async (items) => {

 // titles are present in the first column while bodies in the second column
 // save arrays of title and body to the database
 var news = new News({
  titles: items.map((item) => item[0]),
  bodies: items.map((item) => item[1]),
 });

  await news.save();
}

module.exports = saveNews;