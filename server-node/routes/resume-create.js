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

  //👇🏻 loops through the items in the workArray and converts them to a string
const remainderText = () => {
  let stringText = "";
  for (let i = 0; i < workArray.length; i++) {
      stringText += ` ${workArray[i].company} as a ${workArray[i].position}. My Job description was ${workArray[i].description}`;
  }
  return stringText;
};

// The Objective prompt
const prompt1 = `I am writing a resume, my details are \n name: ${fullName} \n role: ${currentPosition} (${currentLength} years). \n I write in the technolegies: ${currentTechnologies}. Can you write a 100 words description for the top of the resume(first person writing)?`;
//👇🏻 The job responsibilities prompt
const prompt2 = `I am writing a resume, my details are \n name: ${fullName} \n role: ${currentPosition} (${currentLength} years). \n I write in the technolegies: ${currentTechnologies}. Can you write 4 concise points for a resume on what I am good at?`;
//👇🏻 The job achievements prompt
const prompt3 = `I am writing a resume and require a specific format for my work history. For each company I've worked at, the format should be: the company name must be separate on it's own line, followed immediately by three bullet points detailing my roles and achievements at that company, which must each be on its own line. If the description I've provided for a role is less than ideal, please either improve upon it or create solid, industry-standard bullet points highlighting the achievements and responsibilities of that job. In total, this means 4 lines for each company: one for the company name and three for the bullet points. Here are my details:
\n name: ${fullName}
\n role: ${currentPosition} (${currentLength} years).
\n During these years, I worked at ${workArray.length} companies. ${remainderText()}
\n Please write these points in the first person and adhere strictly to the aforementioned format: company name alone on one line, followed by three bullet points, each on its own line - it must always be this format. The company name should always match the given company name, do not change any character due to spelling, ect.`;



const parseGPTResponseForWorkHistory = (text) => {
  const lines = text.split("\n").filter(Boolean); // Remove empty lines if any
  const results = [];

  for (let i = 0; i < lines.length; i += 4) {
    results.push({
      company: lines[i].replace(':', '').trim(),
      descriptionPoints: [
        lines[i + 1],
        lines[i + 2],
        lines[i + 3],
      ].filter(Boolean)  // Removes any undefined or empty lines
    });
  }

  return results;
};


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

try {  //parse job descriptions by each company and update pastExperience to return updated array
  const parsedResponsibilities = await GPTFunction(prompt3);
  console.log(parsedResponsibilities)
  const responsibilitiesData = parseGPTResponseForWorkHistory(parsedResponsibilities);
  console.log(responsibilitiesData)


  newEntry.pastExperience.forEach((experience) => { // Using trim() to ensure that the comparison is not affected by leading or trailing white spaces.
    const correspondingResp = responsibilitiesData.find(r => r.company.trim() === experience.company.trim());
    if (correspondingResp) {
        experience.description = correspondingResp.descriptionPoints.join("\n");
    }
  });

} catch (error) {
    console.error("Error fetching job responsibilities:", error.message);
    chatgptData.jobResponsibilities = "Error fetching job responsibilities";
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
