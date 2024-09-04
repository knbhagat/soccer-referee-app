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


    function _aiResponse(message) {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: message}]
            })
        }
        console.log('URL', process.env.REACT_APP_OPENAI_API_URL);
        fetch(process.env.REACT_APP_OPENAI_API_URL, requestOptions)
        .then(res => res.json())
        .then(data => {
            console.log('data', data);
            _updateLastMessage(data.choices[0].message.content);
        }).catch((error) => {
            console.log(error);
            _updateLastMessage("I'm sorry, I couldn't understand that. Please try again.");
        })
    }

    return (
        <>
            <button id="chatbot-toggle" onClick={() => setChatbot(true)}>
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