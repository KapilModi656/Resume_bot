import { useState,useEffect } from 'react';
import './App.css';
import Chat from './Components/Chat';
import { useSelector, useDispatch } from 'react-redux';
import { sendPromptToGemini } from './send';
import logo from './assets/logo.jpg';

function App() {
  const chatHistory = useSelector((state) => state.chatHistory.chatHistory);
  
  const [text, setText] = useState('');
  const [prompt, setPrompt] = useState('');
  
  const dispatch = useDispatch();
  useEffect(() => {
    
    console.log('Updated chatHistory:', chatHistory);
  }, [chatHistory]);
  const handleSubmit = async () => {
    if (!text.trim()) return;

    // Add user message to chat history
    dispatch({
      type: 'ADD_MESSAGE',
      payload: { text, position: 'right' },
    });
    
    const combinedText = chatHistory.map(item => item.text).join('\n');
    // Update the prompt
    const updatedPrompt = combinedText +"Now you'r Kapil Modi and text after this you have to answer it and dont write as if i am kapil modi or something as after this interviewer is asking question about me from you"+ text;
    setPrompt(updatedPrompt);

    try {
      const response = await sendPromptToGemini(updatedPrompt);

      if (response) {
        // Add AI response to chat history
        console.log(response);
        dispatch({
          type: 'ADD_MESSAGE',
          payload: { text: response, position: 'left' },
        });
        console.log(chatHistory)
      } else {
        console.error('Failed to get a response from Gemini API');
      }
    } catch (error) {
      console.error('Error while sending prompt to Gemini:', error);
    }

    // Clear the input field
    setText('');
  };

  return (
    <>
      <header className="bg-blue-600 text-white p-4 flex items-center">
        <div className="flex items-center space-x-4">
          <img src={logo} alt="Logo" className="h-10 w-10 rounded-full" />
          <h1 className="text-2xl font-bold">Resume: Kapil Modi</h1>
        </div>
      </header>
      <main className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-xl font-semibold mb-4">Ask about my resume</h1>
        <div
          id="ai-solution"
          className="bg-white shadow-md rounded-lg p-4 mb-6 overflow-y-auto max-h-96"
        >
          
          {Array.isArray(chatHistory) && chatHistory.map((item, index) => (
            <div key={index} className="chat-wrapper">
              <Chat text={item.text} position={item.position} />
            </div>
          ))}
        </div>

        <textarea
          id="input-data"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Provide more details about your issue or question..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>

        <button
          id="submit-button"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          onClick={handleSubmit}
        >
          Submit to AI
        </button>
      </main>
      <footer className="bg-gray-800 text-white text-center p-4">
        <p>&copy; 2025 AI Coding Platform</p>
      </footer>
    </>
  );
}

export default App;
