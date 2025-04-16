import { faMessage, faPaperPlane, faRobot, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { React, useState, useRef, useEffect } from "react";
import './Chatbot.css';

/**
 * Chatbot Component
 * A React component that implements a chat interface with AI capabilities.
 * Features include:
 * - Toggleable chat window
 * - Real-time message updates
 * - Auto-scrolling chat history
 * - Integration with backend AI services
 */
function Chatbot () {
    // State management for chatbot visibility and messages
    const [showChatbot, setChatbot] = useState(false);
    const [chatInput, setChatInput] = useState("");
    // Initialize chat history with a welcome message
    const [chatHistory, setChatHistory] = useState([{className: 'incoming', message: (<>Hi there 🤗<br /> How can I help you today?</>)}]);

    // Reference to the chat box for auto-scrolling
    const chatBoxRef = useRef(null);

    // Auto-scroll to bottom when new messages are added
    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTo(0, chatBoxRef.current.scrollHeight);
        }
    }, [chatHistory]);

    /**
     * Updates the last message in the chat history
     * @param {ReactNode} newMessage - The new message content to display
     */
    const _updateLastMessage = (newMessage) => {
        setChatHistory((prevHistory) => {
          if (prevHistory.length === 0) return prevHistory;
    
          // Create a new array with the updated last message
          const updatedHistory = [...prevHistory];
          updatedHistory[updatedHistory.length - 1] = {
            ...updatedHistory[updatedHistory.length - 1],
            message: newMessage,
          };
    
          return updatedHistory;
        });
    };

    /**
     * Handles changes in the chat input field
     * @param {Event} event - The input change event
     */
    const handleInputChange = (event) => {
        setChatInput(event.target.value);
    }

    /**
     * Processes user input and triggers AI response
     * Adds user message to chat history and initiates AI response after a delay
     */
    const handleChat = () => {
        const message = chatInput.trim()
        if (message) {
            // Add user's message to chat history
            setChatHistory((prevHistory) => [
                ...prevHistory,
                { message: message, className: 'outgoing' }
            ]);
            setChatInput("")
            // Simulate AI typing and trigger response
            setTimeout(() => {
                setChatHistory((prevHistory) => [
                    ...prevHistory, 
                    { message: "I'm gathering the details for you...", className: "incoming" }
                ])
                _aiResponse(message);
            }, 500)
        }
    }

    /**
     * Handles AI responses by interacting with backend services
     * Implements a two-tier response system:
     * 1. First attempts to get response from custom RAG model
     * 2. Falls back to OpenAI API if no relevant response is found
     * 
     * @param {string} message - The user's input message
     */
    function _aiResponse(message) {
        // Primary attempt: Query custom RAG model endpoint
        fetch("https://soccer-referee-app.onrender.com/query", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ query_text: message }),
        })
        .then(res => {
            return res.json()
        })
        .then((data) => {
            // Fallback to OpenAI if RAG model doesn't find relevant response
            if (data.fallback) {
                const requestOptions = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
                    },
                    body: JSON.stringify({
                        model: "gpt-3.5-turbo",
                        messages: [{ role: "user", content: message }]
                    })
                };
                // Secondary attempt: Query OpenAI API directly
                fetch(process.env.REACT_APP_OPENAI_API_URL, requestOptions)
                    .then(res => res.json())
                    .then(data => {
                        _updateLastMessage(data.choices[0].message.content);
                    })
                    .catch((error) => {
                        _updateLastMessage("I'm sorry, I couldn't understand that. Please try again.");
                    });
            } else {
                // Use RAG model response if available
                _updateLastMessage(
                    (() => {
                        const sources = data.response.sources;
                        if (sources && sources.length > 0) {
                            const firstSource = sources[0]; // Get the first source
                            const match = firstSource.match(/page_(\d+)\.md/); // Extract the page number
                            if (match) {
                                const formattedSource = `page ${match[1]}`; // Format as "page X"
                                return `From ${formattedSource} of the referee handbook, ${data.response.response}`;
                            }
                        }
                        return "I'm sorry, I couldn't understand that. Please try again."; // Fallback message
                    })()
                );
            }
        })
        .catch((error) => {
            _updateLastMessage("I'm sorry, I couldn't understand that. Please try again.");
        });
    }

    // Render the chatbot interface
    return (
        <>
            {/* Toggle button for showing/hiding chatbot */}
            <button id="chatbot-toggle" onClick={() => showChatbot ? setChatbot(false) : setChatbot(true)}>
                <FontAwesomeIcon icon={faMessage} />
            </button>
            {/* Main chatbot container */}
            <div id="chatbot" className= { showChatbot ? "show" : "" } >
                {/* Chatbot header with close button */}
                <header>
                    <h2>
                        Chatbot
                    </h2>
                    <FontAwesomeIcon icon={faX} onClick={() => setChatbot(false)} />
                </header>
                {/* Chat message history */}
                <ul id="chatbox" ref={chatBoxRef}>
                    {chatHistory.map((chat, index) => {
                        return (
                            <li key={index} className={`chat ${chat.className}`}>
                                {chat.className === 'incoming' && <FontAwesomeIcon icon={faRobot} />}
                                <p>{chat.message}</p>
                            </li>)
                    })}
                </ul>
                {/* Chat input area */}
                <div id="chat-input">
                    <textarea placeholder="Enter a message..." value={chatInput} onChange={handleInputChange} required></textarea>
                    <FontAwesomeIcon icon={faPaperPlane} onClick = {handleChat} />
                </div>
            </div>
        </> );
}

export default Chatbot;