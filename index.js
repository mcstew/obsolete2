const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  console.log("API endpoint /api/chat hit");  // Log when endpoint is hit
  const api_key = process.env.openai_api; // Access the OpenAI API key from environment variable
  
  try {
    console.log("Trying to send request to OpenAI");  // Log before sending request to OpenAI
    const userInput = req.body.userInput;
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userInput }],
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${api_key}`,
        },
      }
    );
    console.log("Received response from OpenAI:", response.data);  // Log the response from OpenAI
    res.status(200).json({ message: response.data.choices[0].message.content });
  } catch (error) {
    console.error("Error occurred: ", error);  // Log any errors
    res.status(500).json({ error: "An error occurred" });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server running');
});
