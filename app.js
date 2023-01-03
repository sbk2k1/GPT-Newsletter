require('dotenv').config();
const cron = require('node-cron');
const SibApiV3Sdk = require('sib-api-v3-sdk');
const { Configuration, OpenAIApi } = require('openai');
const seed = require('./seed.json');
// const Newsletter = require('./models/newsletter');

// start a cron job for everyweek monday at 11:00 am

// cron.schedule('0 6 * * 1', () => {
//   console.log('running a task every week monday at 11:00 am');
//   sendEmail();
// });   

// send email to template 5
async function sendEmail() {

  //get data from openai

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
      title1: 'Vortex',
      title2: 'Hello, this is a test email',
      title3: 'Hello, this is a test email',
      title4: 'Hello, this is a test email',
      body1: bodies[0],
      body2: bodies[1],
      body3: bodies[2],
      body4: bodies[3],
    },
  };
  apiInstance.sendTransacEmail(sendSmtpEmail).then(
    function (data) {
      console.log('API called successfully. Returned data: ' + data);
    }
  );
}

// get completion from openai
async function getCompletion() {
  var bodies = [];
  for (var i = 0; i < 4; i++) {

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
    completion = openai.createCompletion({
      model: "text-davinci-003",
      prompt: randomPrompt,
      max_tokens: 4000,
    }).then((data) => {
      // console.log(data.data.choices[0].text);
      bodies.push(data.data.choices[0].text);
    });
  }
  // wait for 5 seconds
  // await new Promise(r => setTimeout(r, 10000));
  console.log(bodies);
  return bodies;
}

getCompletion();
