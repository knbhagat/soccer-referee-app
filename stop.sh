#!/bin/bash

# Soccer Referee App - Docker Stop Script
echo "🛑 Stopping Soccer Referee App..."

# Stop and remove containers
docker-compose down

echo "✅ Services stopped successfully!"
echo ""
echo "To start again: ./start.sh"
echo "To remove all data: docker-compose down -v"
