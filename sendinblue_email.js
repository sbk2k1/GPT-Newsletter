require('dotenv').config();

const SibApiV3Sdk = require('sib-api-v3-sdk');
let defaultClient = SibApiV3Sdk.ApiClient.instance;

let apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.SENDINBLUE_API_KEY;

let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

// send email to template 5

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
    body1: 'This is a test email',
    body2: 'This is a test email',
    body3: 'This is a test email',
    body4: 'This is a test email',
  },
};

apiInstance.sendTransacEmail(sendSmtpEmail).then(
  function (data) {
    console.log('API called successfully. Returned data: ' + data);
  },
  function (error) {
    console.error("error");
  }
);
