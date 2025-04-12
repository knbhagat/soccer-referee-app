import React from 'react';
import './App.css';
import Chatbot from './components/Chatbot';
import Homepage from './components/Homepage';

function App() {
  return (
    <div className="App">
      <Homepage />
      <Chatbot />
    </div>
  );
}

export default App;
