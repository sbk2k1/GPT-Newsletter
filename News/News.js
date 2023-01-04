const { Configuration, OpenAIApi } = require('openai');
const seed = require('./seed.json');
require('dotenv').config();

// get completion from openai
var getCompletion = async () => {
 var news = "";

 // write function to get 4 different random prompts and get completion from openai
 // get keys from seed object
 var keys = Object.keys(seed);
 // get random key from seed object
 var randomKey = keys[Math.floor(Math.random() * keys.length)];
 // get random prompt from seed object
 var randomPrompt = seed[randomKey];
 // get random number from seed[randomKey].length
 var randomNumber = Math.floor(Math.random() * seed[randomKey].length);
 // get random prompt from seed[randomKey]
 var randomPrompt = seed[randomKey][randomNumber];

 const configuration = new Configuration({
   apiKey: process.env.OPENAI_API_KEY,
 });

 const openai = new OpenAIApi(configuration);

 await openai.createCompletion({
   model: 'text-davinci-003',
   prompt: randomPrompt,
   max_tokens: 4000,
 }).then((response) => {
   news = response.data.choices[0].text;
 });


 // // create promise to stop execution for 2 minutes
 // var promise = new Promise((resolve, reject) => {
 //   setTimeout(() => resolve("done!"), 10000)
 // });              

 return [randomKey, news];
};

module.exports = getCompletion;