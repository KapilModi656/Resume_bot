import { useState, useEffect, useRef } from 'react';
import './App.css';
import Chat from './Components/Chat';
import { useSelector, useDispatch } from 'react-redux';
import { sendPromptToGemini } from './send';
import logo from './assets/logo.jpg';

function App() {
  const chatHistory = useSelector((state) => state.chatHistory.chatHistory);
  
  const [text, setText] = useState('');
  const [prompt, setPrompt] = useState('');
  const aiSolutionRef = useRef(null); // Ref for the ai-solution div
  
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('Updated chatHistory:', chatHistory);

    // Scroll to the bottom of the ai-solution div
    if (aiSolutionRef.current) {
      aiSolutionRef.current.scrollTop = aiSolutionRef.current.scrollHeight;
    }
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
    const updatedPrompt = combinedText +`You are now representing Kapil Modi. You will answer questions from an interviewer based on his resume. Do not say "I am Kapil Modi" or refer to yourself as a bot. Respond professionally, as if you are Kapil speaking in a real interview.

If the interviewer greets you (e.g., "Hello", "Welcome"), respond politely and professionally, without mentioning that you are an AI or that you're pretending to be Kapil.

Avoid repeating the instructions, and never give awkward or robotic replies. Stay in character and behave as a confident, well-prepared professional candidate. Focus on showcasing Kapil Modi's skills, experiences, and strengths relevant to the questions asked.


response- Okay.`+ text;
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
      <header
        style={{
          backgroundColor: '#1E3A8A',
          color: 'white',
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 10,
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <img
            src={logo}
            alt="Logo"
            style={{ height: '40px', width: '40px', borderRadius: '50%' }}
          />
          <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>
            Resume: Kapil Modi
          </h1>
        </div>
      </header>
      <main
        style={{
          paddingTop: '80px',
          padding: '24px',
          backgroundColor: '#F3F4F6',
          minHeight: 'calc(100vh - 64px)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <h1
          style={{
            fontSize: '20px',
            fontWeight: '600',
            marginBottom: '16px',
          }}
        >
          Ask about my resume
        </h1>
        <div
          id="ai-solution"
          ref={aiSolutionRef}
          style={{
            backgroundColor: 'white',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: 'auto',
            overflowY: 'auto',
            flexGrow: 1,
            maxHeight: '60vh',
          }}
        >
          {Array.isArray(chatHistory) &&
            chatHistory.map((item, index) => (
              <div key={index} className="chat-wrapper">
                <Chat text={item.text} position={item.position} />
              </div>
            ))}
        </div>

        <div
          style={{
            position: 'fixed',
            bottom: 64,
            left: 0,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px',
            padding: '16px',
            boxShadow: '0 -2px 4px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#F9FAFB',
            borderRadius: '8px',
          }}
        >
          <textarea
            id="input-data"
            style={{
              flexGrow: 1,
              padding: '12px',
              border: '1px solid #D1D5DB',
              borderRadius: '8px',
              outline: 'none',
              resize: 'none',
              fontFamily: 'monospace',
              fontSize: '14px',
              maxWidth: '80%',
            }}
            placeholder="Type your message here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <button
            id="submit-icon-button"
            style={{
              backgroundColor: '#2563EB',
              color: 'white',
              padding: '12px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background-color 0.3s',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
            onClick={handleSubmit}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor = '#1D4ED8')
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = '#2563EB')
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style={{ height: '20px', width: '20px' }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </main>
      <footer
        style={{
          backgroundColor: '#0F172A',
          color: '#94A3B8',
          textAlign: 'center',
          padding: '16px',
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          fontSize: '14px',
          fontFamily: 'monospace',
        }}
      >
        <p>&copy; 2025 Resume-Bot:Kapil Modi</p>
      </footer>
    </>
  );
}

export default App;
