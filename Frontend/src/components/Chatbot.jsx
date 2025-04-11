import { faMessage, faPaperPlane, faRobot, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { React, useState, useRef, useEffect } from "react";
import './Chatbot.css';

function Chatbot () {
    const [showChatbot, setChatbot] = useState(false);
    const [chatInput, setChatInput] = useState("");
    const [chatHistory, setChatHistory] = useState([{className: 'incoming', message: (<>Hi there 🤗<br /> How can I help you today?</>)}]);

    const chatBoxRef = useRef(null);

    // Use useEffect to scroll to the bottom when chatHistory changes
    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTo(0, chatBoxRef.current.scrollHeight);
        }
    }, [chatHistory]);

    const _updateLastMessage = (newMessage) => {
        setChatHistory((prevHistory) => {
          if (prevHistory.length === 0) return prevHistory;
    
          // Directly update the last message
          const updatedHistory = [...prevHistory];
          updatedHistory[updatedHistory.length - 1] = {
            ...updatedHistory[updatedHistory.length - 1],
            message: newMessage,
          };
    
          return updatedHistory;
        });
    };

    const handleInputChange = (event) => {
        setChatInput(event.target.value);
    }

    const handleChat = () => {
        const message = chatInput.trim()
        if (message) {
            // users chat
            setChatHistory((prevHistory) => [
                ...prevHistory,
                { message: message, className: 'outgoing' }
            ]);
            setChatInput("")
            // ai's chat
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
     * Handles AI responses by interacting with a backend service and the OpenAI API.
     * 
     * This function sends a query message to a backend server at `http://localhost:8000/query`.
     * If the backend server cannot find a relevant response (e.g., no similar vector within chroma),
     * it falls back to querying the OpenAI API directly using the GPT-3.5-turbo model.
     * 
     * The function updates the last message in the chat interface with the response from either
     * the backend or the OpenAI API. If an error occurs during any of the fetch requests, 
     * it logs the error and updates the chat with a default error message.
     * 
     * @param {string} message - The user's input message to be processed by the AI.
     */
    function _aiResponse(message) {
        // handles our langchain w RAG rules book vecttorstore and OpenAI API
        fetch("http://localhost:8000/query", {
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
            // Rag model doesn't find a similar vector in chroma, then we fallback to openAI API
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
                fetch(process.env.REACT_APP_OPENAI_API_URL, requestOptions)
                    .then(res => res.json())
                    .then(data => {
                        _updateLastMessage(data.choices[0].message.content);
                    })
                    .catch((error) => {
                        _updateLastMessage("I'm sorry, I couldn't understand that. Please try again.");
                    });
            } else {
                _updateLastMessage(data.response.response || "I'm sorry, I couldn't understand that. Please try again.");
            }
        })
        .catch((error) => {
            _updateLastMessage("I'm sorry, I couldn't understand that. Please try again.");
        });
    }

    return (
        <>
            <button id="chatbot-toggle" onClick={() => showChatbot ? setChatbot(false) : setChatbot(true)}>
                <FontAwesomeIcon icon={faMessage} />
            </button>
            <div id="chatbot" className= { showChatbot ? "show" : "" } >
                <header>
                    <h2>
                        Chatbot
                    </h2>
                    <FontAwesomeIcon icon={faX} onClick={() => setChatbot(false)} />
                </header>
                <ul id="chatbox" ref={chatBoxRef}>
                    {chatHistory.map((chat, index) => {
                        return (
                            <li key={index} className={`chat ${chat.className}`}>
                                {chat.className === 'incoming' && <FontAwesomeIcon icon={faRobot} />}
                                <p>{chat.message}</p>
                            </li>)
                    })}
                </ul>
                <div id="chat-input">
                    <textarea placeholder="Enter a message..." value={chatInput} onChange={handleInputChange} required></textarea>
                    <FontAwesomeIcon icon={faPaperPlane} onClick = {handleChat} />
                </div>
            </div>
        </> );
}

export default Chatbot;