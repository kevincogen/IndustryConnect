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
      userId,
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



// The Objective prompt
const prompt1 = `I am writing a resume, my details are \n name: ${fullName} \n role: ${currentPosition} (${currentLength} years). \n I write in the technolegies: ${currentTechnologies}. Can you write a 100 words description for the top of the resume(first person writing)?`;
//👇🏻 The job responsibilities prompt
const prompt2 = `I am writing a resume, my details are \n name: ${fullName} \n role: ${currentPosition} (${currentLength} years). \n I write in the technolegies: ${currentTechnologies}. Can you write 4 concise points for a resume on what I am good at?`;




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

// Process each pastExperience entry to fetch the refined bullet points
for (let experience of newEntry.pastExperience) {
  const promptForExperience = `
      Given my role as ${experience.position} at ${experience.company}, where I was responsible for: ${experience.description}, provide three industry-standard bullet points detailing my roles and achievements in the first person.
      Ensure the result is three lines only, each beginning with a dot bullet point, without mentioning the role or company.
  `;

  try {
      const refinedDescription = await GPTFunction(promptForExperience);
      experience.description = refinedDescription.trim();  // Directly update the description
      console.log(experience)
  } catch (error) {
      console.error(`Error fetching job responsibilities for ${experience.position} at ${experience.company}:`, error.message);
  }
}

// Log the result


const data = { ...newEntry, ...chatgptData };
database.push(data);
console.log(data)

try {

  // SQL query to update the user's table
  await db.query('UPDATE users SET resumeai = $1 WHERE id = $2', [JSON.stringify(data), userId]);
  console.log(` ${JSON.stringify(data)} gpt resume added to user profile ${userId}`)
} catch (error) {
  console.error("Error updating user's resumeAI:", error.message);
  return res.status(500).json({ message: "Failed to update user's profile." });
}

res.json({
    message: "Request processed!",
    data: data
});
});

module.exports = router;
