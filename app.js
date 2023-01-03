require('dotenv').config();
const cron = require('node-cron');
const SibApiV3Sdk = require('sib-api-v3-sdk');
const { Configuration, OpenAIApi } = require('openai');
const seed = require('./seed.json');

async function sendEmail() {

  //get data from openai
  var items = [];
  for(let i = 0; i < 4; i++){
  var response = await getCompletion();
  items.push(response);
  }


  let defaultClient = SibApiV3Sdk.ApiClient.instance;
  let apiKey = defaultClient.authentications['api-key'];
  apiKey.apiKey = process.env.SENDINBLUE_API_KEY;
  let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  sendSmtpEmail = {
    to: [
      {
        email: 'mailofficialvortex@gmail.com',
        name: 'SBK',
      },
    ],
    templateId: 2,
    params: {
      title1: items[0][0],
      title2: items[1][0],
      title3: items[2][0],
      title4: items[3][0],
      body1: items[0][1],
      body2: items[1][1],
      body3: items[2][1],
      body4: items[3][1],
    },
  };
  apiInstance.sendTransacEmail(sendSmtpEmail).then(
    function (data) {
      console.log('API called successfully. Returned data: ' + data);
    }
  );
}

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

sendEmail();
