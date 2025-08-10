#!/bin/bash

# Soccer Referee App - Docker Development Startup Script
echo "🚀 Starting Soccer Referee App in Development Mode..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if .env file exists
if [ ! -f "Backend/modern_backend/.env" ]; then
    echo "❌ Backend .env file not found at Backend/modern_backend/.env"
    echo "Please ensure your .env file exists with OPENAI_API_KEY"
    exit 1
fi

# Build and start services in development mode
echo "📦 Building and starting services in development mode..."
docker-compose -f docker-compose.dev.yml up --build

echo ""
echo "✅ Development servers are running!"
echo ""
echo "🌐 Frontend: http://localhost:3000 (with hot reload)"
echo "🔧 Backend API: http://localhost:8000 (with auto-reload)"
echo "📚 API Docs: http://localhost:8000/docs"
echo ""
echo "To stop services: Ctrl+C or ./stop.sh"
echo "To view logs: docker-compose -f docker-compose.dev.yml logs -f"
