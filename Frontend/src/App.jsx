import React from 'react';
import './App.css';
import Chatbot from './components/Chatbot';
import Homepage from './components/Homepage';


// const navLink = document.getElementById("topLinks");
// const x = document.getElementById("close");
// const menu = document.getElementById("menu");
// const sendChatBtn = document.querySelector("#chat-input calcite-icon");
// const chatInput = document.querySelector("#chat-input textarea");
// const chatBox = document.getElementById("chatbox");

// const API_URL = 'https://api.openai.com/v1/chat/completions';
// const API_KEY = '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';


// function scrollRefereePage() {
//     document.getElementsByClassName("crAssistance")[0].scrollIntoView({ behavior: 'smooth'});
// }

// function scrollHomePage() {
//     document.getElementsByClassName("header")[0].scrollIntoView({ behavior:'smooth' });
// }

// function scrollAssistantRefereePage() {
//     document.getElementsByClassName("arAssistance")[0].scrollIntoView({ behavior: 'smooth'});
// }

// function toggleChatbot() {
//     const chatbot = document.querySelector("#chatbot");
//     chatbot.classList.toggle("show");
// }

// function aiResponse(chatElement, message) {
//     const requestOptions = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${API_KEY}`
//         },
//         body: JSON.stringify({
//             model: "gpt-3.5-turbo",
//             messages: [{ role: "user", content: message}]
//         })
//     }

//     fetch(API_URL, requestOptions)
//     .then(res => res.json())
//     .then(data => {
//         console.log('data', data);
//         chatElement.textContent = data.choices[0].message.content;
//     }).catch((error) => {
//         console.log(error);
//         chatElement.textContent = "I'm sorry, I couldn't understand that. Please try again."
//     }).finally(() => chatBox.scrollTo(0, chatBox.scrollHeight));
// }

// function createChat(message, className) {
//     const chat = document.createElement("li");
//     chat.classList.add("chat", className);
//     let content = className === "outgoing" ? `<p></p>` : `<i class="fa-solid fa-robot"></i><p></p>`;
//     chat.innerHTML = content;
//     // ensures that chat cannot contain an element withing the p tag
//     chat.querySelector("p").textContent = message;
//     return chat;
// }

// function handleChat() {
//     const message = chatInput.value.trim();
//     if (message) {
//         chatBox.appendChild(createChat(message, "outgoing"));
//         chatBox.scrollTo(0, chatBox.scrollHeight);
//         // clears chatInput
//         chatInput.value = '';
//         setTimeout(() => {
//             const incomingChat = createChat("I'm gathering the details for you...", "incoming");
//             chatBox.appendChild(incomingChat);
//             chatBox.scrollTo(0, chatBox.scrollHeight);
//             aiResponse(incomingChat.querySelector('p'), message)
//         })
//     }
// }

// sendChatBtn.addEventListener("click", handleChat);

function App() {
  return (
    <div className="App">
      <Homepage />
      <Chatbot />
    </div>
  );
}

export default App;
