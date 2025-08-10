'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faPaperPlane, faRobot, faX } from '@fortawesome/free-solid-svg-icons';
import { useApp } from '@/context/AppContext';
import { apiService } from '@/services/api';

export default function Chatbot() {
  const { state, addMessage, updateLastMessage, updateLastMessageWithSource, setLoading, setError } = useApp();
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const chatBoxRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTo(0, chatBoxRef.current.scrollHeight);
    }
  }, [state.chatHistory]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChatInput(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleChat();
    }
  };

  const handleChat = async () => {
    const message = chatInput.trim();
    if (!message || state.isLoading) return;

    // Add user message
    addMessage(message, 'user');
    setChatInput('');
    setLoading(true);

    try {
      // Add loading message
      addMessage('I\'m gathering the details for you...', 'assistant');
      
      // Query the API
      const response = await apiService.queryRules({ query_text: message });

      // Update the loading message with the actual response and source info
      const sourceInfo = response.data_source === 'rulebook' 
        ? (response.page_references && response.page_references.length > 0)
          ? `From RAG AI Bot with FIFA Laws of the Game 2024/25 (pages ${response.page_references.join(', ')})`
          : `From RAG AI Bot with FIFA Laws of the Game 2024/25`
        : `From soccer ai bot with a general knowledge base`;
      
      updateLastMessageWithSource(response.response, sourceInfo);
    } catch (error) {
      console.error('Chatbot error:', error);
      setError(error instanceof Error ? error.message : 'Failed to get response');
      updateLastMessage(`Sorry, I encountered an error: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <button
        onClick={() => setShowChatbot(!showChatbot)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-[#F4B400] hover:bg-[#F26B38] hover:text-white text-[#1B1B1B] rounded-full p-3 sm:p-4 shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Toggle chatbot"
      >
        <FontAwesomeIcon 
          icon={showChatbot ? faX : faMessage} 
          className="text-lg sm:text-xl" 
        />
      </button>

      {/* Chatbot Window */}
      {showChatbot && (
        <div className="fixed bottom-20 right-4 left-4 sm:bottom-24 sm:right-6 sm:left-auto z-40 w-auto sm:w-96 h-[400px] sm:h-[500px] bg-[#FFFFFF] rounded-lg shadow-2xl border border-[#D9DED9] flex flex-col">
          {/* Header */}
          <div className="bg-[#2F6B4F] text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faRobot} className="text-lg" />
              <h3 className="font-semibold">Referee Assistant</h3>
            </div>
            <button
              onClick={() => setShowChatbot(false)}
              className="text-white hover:text-[#E5EDE9] transition-colors"
            >
              <FontAwesomeIcon icon={faX} />
            </button>
          </div>

          {/* Chat Messages */}
          <div 
            ref={chatBoxRef}
            className="flex-1 p-4 overflow-y-auto space-y-4"
          >
            {state.chatHistory.map((message) => (
              <div
                key={message.id}
                className={`flex flex-col ${message.type === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-[#D4DE95] text-[#3D4127]'
                      : 'bg-[#E5E7E4] text-[#3D4127]'
                  }`}
                >
                  <div className="whitespace-pre-wrap text-sm">
                    {message.content}
                  </div>
                  <div className={`text-xs mt-1 ${
                    message.type === 'user' ? 'text-[#535B1F]' : 'text-[#636B2F]'
                  }`}>
                    {message.timestamp.toLocaleTimeString('en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit',
                      hour12: true 
                    })}
                  </div>
                </div>
                {/* Source information - only for assistant messages */}
                {message.type === 'assistant' && message.sourceInfo && (
                  <div className="mt-1 px-2">
                    <div className="text-xs text-gray-400 font-light">
                      {message.sourceInfo}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-[#E5E7E4]">
            <div className="flex space-x-2">
              <input
                type="text"
                value={chatInput}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Ask about soccer rules..."
                disabled={state.isLoading}
                className="flex-1 px-3 py-2 border border-[#636B2F] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4DE95] focus:border-transparent disabled:bg-[#E5E7E4]"
              />
              <button
                onClick={handleChat}
                disabled={!chatInput.trim() || state.isLoading}
                className="px-4 py-2 bg-[#D4DE95] text-[#3D4127] rounded-lg hover:bg-[#DEE8A5] disabled:bg-[#636B2F] disabled:cursor-not-allowed transition-colors"
              >
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
