require('dotenv').config();
const {Configuration, OpenAIApi} = require('openai');

const configuration = new Configuration({
 apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// async function getCompletion(prompt) {
//  const completion = await openai.createCompletion({
//   model: "text-davinci-002",
//   prompt
//  });

//  return completion.data.choices[0].text;
// }

var starting_prompts = ["Todays News is:", "Just a few hours ago:", "Today's News is:", "Today's News is:"]

for(var i=0; i<4; i++) {
openai.createCompletion({
  model: "text-davinci-003",
  prompt: "Todays News is:",
  max_tokens: 4000,
}).then((completion) => {
  console.log(completion.data.choices[0].text);
});
}
