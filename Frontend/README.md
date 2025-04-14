# Soccer Referee App Frontend

A React-based web application for soccer referees, featuring an AI-powered chatbot for rule clarification and assistance.

## 🚀 Features

- **AI-Powered Chatbot**: Interactive chat interface with:
  - RAG (Retrieval Augmented Generation) model integration
  - OpenAI GPT-3.5 fallback
  - Real-time message updates
  - Auto-scrolling chat history
- **Modern UI Components**: Built with:
  - React 18
  - FontAwesome icons
  - Calcite Components
  - Responsive design

## 🛠️ Tech Stack

- **Framework**: React 18.3.1
- **Routing**: React Router DOM 6.26.1
- **UI Components**:
  - @esri/calcite-components
  - FontAwesome icons
- **Build Tools**: Create React App
- **Testing**: Jest & React Testing Library

## 📦 Installation

1. Clone the repository
2. Navigate to the Frontend directory:
   ```bash
   cd Frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the Frontend directory with the following variables:
   ```
   REACT_APP_OPENAI_API_KEY=your_openai_api_key
   REACT_APP_OPENAI_API_URL=your_openai_api_url
   ```

## 🚀 Development

To start the development server:

```bash
npm start
```

The app will be available at `http://localhost:3000`

## 📝 Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from Create React App

## 🏗️ Project Structure

```
Frontend/
├── public/          # Static files
├── src/
│   ├── components/  # React components
│   ├── resources/   # Static resources
│   ├── App.jsx      # Main application component
│   ├── index.js     # Application entry point
│   └── App.css      # Global styles
├── package.json     # Dependencies and scripts
└── .env            # Environment variables
```

## 🤖 Chatbot Component

The main chatbot component (`Chatbot.jsx`) features:
- Toggleable chat window
- Real-time message updates
- Auto-scrolling chat history
- Two-tier AI response system:
  1. Primary: Custom RAG model for soccer rule queries
  2. Fallback: OpenAI GPT-3.5 for general queries

## 🔒 Environment Variables

Required environment variables:
- `REACT_APP_OPENAI_API_KEY`: Your OpenAI API key
- `REACT_APP_OPENAI_API_URL`: OpenAI API endpoint URL

## 🌐 Browser Support

The app supports:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop
- Tablet
- Mobile devices

## 🧪 Testing

Run tests using:
```bash
npm test
```

## 📦 Building for Production

To create a production build:
```bash
npm run build
```

The build artifacts will be stored in the `build/` directory.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details. 