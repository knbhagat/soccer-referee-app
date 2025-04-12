# Soccer Referee App

The **Soccer Referee App** is a comprehensive platform designed to educate and train aspiring soccer referees. This application provides tools and resources to help users learn the rules of the game, practice referee-specific skills, and simulate real-world scenarios. It also includes a chatbot powered by advanced AI technologies to answer questions directly from the referee rule manual.

## Features

### 1. **Referee Enrollment**
   - A dedicated section for users to register as referees through the official U.S. Soccer Referee Program.

### 2. **Rule Book Access**
   - Provides access to the official soccer rule book, allowing users to browse and understand the laws of the game.

### 3. **Hand Signal Practice**
   - **Center Referee**: Learn and practice hand signals used by center referees to communicate decisions effectively.
   - **Assistant Referee**: Practice flag signals for offside calls, fouls, and other match decisions.

### 4. **Whistle Fluctuations**
   - Listen to different whistle patterns and learn how they are used to control the game.

### 5. **Offside Simulator**
   - A game-like simulation to practice making accurate offside decisions in real-time scenarios.

### 6. **Referee Rulebook Chatbot**
   - A chatbot trained on the referee rule manual using **LangChain** and **RAG (Retrieval-Augmented Generation)**.
   - Users can ask questions about the rules, and the chatbot provides accurate, context-aware answers.

---

## Technologies Used

### **Frontend**
- **React**: A JavaScript library for building the user interface.
- **Bootstrap**: Used for responsive and modern UI components.
- **FontAwesome**: For icons used across the application.

### **Backend**
- **FastAPI**: A modern, fast (high-performance) web framework for building APIs with Python.
- **LangChain**: Used for building the chatbot with Retrieval-Augmented Generation (RAG).
- **OpenAI**: Provides the GPT-based language model for generating responses.

### **Database**
- **Chroma**: A vector database used to store embeddings of the referee rulebook for efficient similarity searches.

---

## Future Enhancements

### 1. **Interactive Training Modules**
    - Develop additional modules to provide more hands-on referee training experiences.

### 2. **Expanded Chatbot Knowledge Base**
    - Enhance the chatbot by incorporating a broader range of soccer-related resources and materials.

### 3. **User Authentication**
    - Implement a secure user authentication system to enable personalized experiences and progress tracking.
