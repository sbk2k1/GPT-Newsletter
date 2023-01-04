require('dotenv').config();
const SibApiV3Sdk = require('sib-api-v3-sdk');

var getCompletion = require('../News/News.js');

var saveNews = require('../Mongo/services/news.js');

async function sendEmail() {

  //get data from openai
  var items = [];
  for (let i = 0; i < 4; i++) {
    var response = await getCompletion();
    items.push(response);
  }


  let defaultClient = SibApiV3Sdk.ApiClient.instance;
  let apiKey = defaultClient.authentications['api-key'];
  apiKey.apiKey = process.env.SENDINBLUE_API_KEY;
  let apiInstanceTransaction = new SibApiV3Sdk.TransactionalEmailsApi();
  let apiInstanceContacts = new SibApiV3Sdk.ContactsApi();
  let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  list_id = 8;

  // get contacts from list
  var contacts = apiInstanceContacts.getContactsFromList(list_id).then(
    function (data) {

      //get both name and email from contacts
      var emails = data.contacts.map((contact) => {
        return {
          name: contact.attributes.FIRSTNAME + " " + contact.attributes.LASTNAME,
          email: contact.email,
        }
      });


      //send smtp email to all these mails
      sendSmtpEmail = {
        to: emails,
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

      apiInstanceTransaction.sendTransacEmail(sendSmtpEmail).then(
        function (data) {
          console.log('Mail Sent Successfully');
        }
      );

      //save news to database
      saveNews(items);
    }
  );
}

module.exports = sendEmail;