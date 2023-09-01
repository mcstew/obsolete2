const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

// Log: Middleware setup
console.log("Setting up middleware...");

app.use(cors());
app.use(express.json());

// Log: API endpoint setup
console.log("Setting up API endpoint...");

app.post('/api/chat', async (req, res) => {
  const api_key = "OPENAI_KEY_HERE"; // Replace with your OpenAI API key

  // Log: Received API call
  console.log("Received API call to /api/chat");

  const userInput = req.body.userInput;

  // Log: User input
  console.log("Received user input:", userInput);

  try {
    // Log: Making request to OpenAI
    console.log("Making request to OpenAI...");

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

    // Log: Response from OpenAI
    console.log("Received response from OpenAI:", response.data);

    // Log: Sending response back to client
    console.log("Sending response back to client...");

    res.status(200).json({ message: response.data.choices[0].message.content });
  } catch (error) {
    // Log: Error details
    console.error("An error occurred:", error);

    res.status(500).json({ error: "An error occurred" });
  }
});

// Log: Server setup
console.log("Setting up server...");

app.listen(process.env.PORT || 3000, () => {
  // Log: Server running
  console.log('Server running on port:', process.env.PORT || 3000);
});
