const port = 3000; // Replace with your actual port number

async function sendPromptToGemini(prompt) {
    try {
      const response = await fetch(`https://probable-umbrella-97q6jxqqqp9x374pv-${port}.app.github.dev/api/gemini`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log(data.response.parts[0].text)
      return data.response.parts[0].text; // Access the generated content from the response
       //Return the generated response
    } catch (error) {
      console.error('Error:', error);
      return null; // Return null in case of error
    }
  }
  export { sendPromptToGemini };
  export default sendPromptToGemini;