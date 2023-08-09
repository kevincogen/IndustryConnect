const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPEN_API_KEY,
});
const generateID = () => {
  return Math.floor(Math.random() * 1000000);  // Generates a random integer between 0 and 999999
}

const openai = new OpenAIApi(configuration);

const GPTFunction = async (text) => {
  const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: text,
      temperature: 0.6,
      max_tokens: 250,
      top_p: 1,
      frequency_penalty: 1,
      presence_penalty: 1,
  });
  return response.data.choices[0].text;
};


let database = [];
router.post("/", async (req, res) => {
  const {
      fullName,
      currentPosition,
      currentLength,
      currentTechnologies,
      pastExperience,
  } = req.body;

  const workArray = pastExperience
  console.log(req.body);

  //👇🏻 group the values into an object
  const newEntry = {
    id: generateID(),
    fullName,
    currentPosition,
    currentLength,
    currentTechnologies,
    pastExperience: workArray,
  };

  //👇🏻 loops through the items in the workArray and converts them to a string
const remainderText = () => {
  let stringText = "";
  for (let i = 0; i < workArray.length; i++) {
      stringText += ` ${workArray[i].company} as a ${workArray[i].position}.`;
  }
  return stringText;
};

// The Objective prompt
const prompt1 = `I am writing a resume, my details are \n name: ${fullName} \n role: ${currentPosition} (${currentLength} years). \n I write in the technolegies: ${currentTechnologies}. Can you write a 100 words description for the top of the resume(first person writing)?`;
//👇🏻 The job responsibilities prompt
const prompt2 = `I am writing a resume, my details are \n name: ${fullName} \n role: ${currentPosition} (${currentLength} years). \n I write in the technolegies: ${currentTechnologies}. Can you write 10 points for a resume on what I am good at?`;
//👇🏻 The job achievements prompt
const prompt3 = `I am writing a resume, my details are \n name: ${fullName} \n role: ${currentPosition} (${currentLength} years). \n During my years I worked at ${
  workArray.length
} companies. ${remainderText()} \n Can you write me 50 words for each company seperated in numbers of my succession in the company (in first person)?`;




// Initialize an empty object for chatgptData
let chatgptData = {};

try {
    chatgptData.objective = await GPTFunction(prompt1);
} catch (error) {
    console.error("Error fetching objective:", error.message);
    chatgptData.objective = "Error fetching objective";
}

try {
    chatgptData.keypoints = await GPTFunction(prompt2);
} catch (error) {
    console.error("Error fetching keypoints:", error.message);
    chatgptData.keypoints = "Error fetching keypoints";
}

try {
    chatgptData.jobResponsibilities = await GPTFunction(prompt3);
} catch (error) {
    console.error("Error fetching job responsibilities:", error.message);
    chatgptData.jobResponsibilities = "Error fetching job responsibilities";
}

// Log the result
console.log(chatgptData);

const data = { ...newEntry, ...chatgptData };
database.push(data);


res.json({
    message: "Request processed!",
    data: data
});
});

module.exports = router;
