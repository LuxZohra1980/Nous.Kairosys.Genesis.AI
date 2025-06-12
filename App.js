// src/App.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const callGeminiAPI = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        'https://api.gemini.google/v1/chat/completions',  // esempio URL, controlla quello corretto Gemini
        {
          model: 'gemini-1.5', // esempio modello
          messages: [{ role: 'user', content: 'Ciao Gemini!' }],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer LA_TUA_API_KEY`,  // qui metti la tua key
          },
        }
      );
      setResponse(res.data.choices[0].message.content);
    } catch (error) {
      setResponse('Errore nella chiamata API: ' + error.message);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Test AI Gemini</h1>
      <button onClick={callGeminiAPI} disabled={loading}>
        {loading ? 'Caricamento...' : 'Chiama Gemini'}
      </button>
      <pre style={{ marginTop: 20, whiteSpace: 'pre-wrap' }}>{response}</pre>
    </div>
  );
}

export default App;
