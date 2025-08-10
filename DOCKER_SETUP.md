# 🐳 Docker Setup for Soccer Referee App

This guide will help you run the Soccer Referee App using Docker containers, allowing you to start both the frontend and backend with a single command.

## 📋 Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed and running
- [Docker Compose](https://docs.docker.com/compose/install/) installed
- OpenAI API key (for the backend)

## 🚀 Quick Start

### 1. Environment Setup

Ensure your backend environment file exists:
```bash
# Check if .env file exists
ls Backend/modern_backend/.env
```

If it doesn't exist, create it with your OpenAI API key:
```bash
echo "OPENAI_API_KEY=your_openai_api_key_here" > Backend/modern_backend/.env
```

### 2. Start the Application

#### Production Mode (Recommended)
```bash
./start.sh
```

#### Development Mode (with hot reloading)
```bash
./start-dev.sh
```

### 3. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

### 4. Stop the Application
```bash
./stop.sh
```

## 🛠️ Manual Commands

If you prefer to use Docker Compose directly:

### Production Mode
```bash
# Build and start services
docker-compose up --build -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Development Mode
```bash
# Build and start services with hot reloading
docker-compose -f docker-compose.dev.yml up --build

# View logs
docker-compose -f docker-compose.dev.yml logs -f

# Stop services
docker-compose -f docker-compose.dev.yml down
```

## 📁 Project Structure

```
soccer-referee-app/
├── docker-compose.yml          # Production Docker Compose
├── docker-compose.dev.yml      # Development Docker Compose
├── start.sh                    # Production startup script
├── start-dev.sh               # Development startup script
├── stop.sh                    # Stop script
├── Backend/
│   └── modern_backend/
│       ├── Dockerfile         # Backend container
│       ├── .dockerignore      # Backend ignore file
│       └── .env               # Backend environment
└── Frontend/
    └── modern-referee-app/
        ├── Dockerfile         # Production frontend container
        ├── Dockerfile.dev     # Development frontend container
        └── .dockerignore      # Frontend ignore file
```

## 🔧 Configuration

### Environment Variables

#### Backend (.env file)
```bash
OPENAI_API_KEY=your_openai_api_key_here
```

#### Frontend (set in docker-compose)
```bash
NEXT_PUBLIC_API_URL=http://backend:8000
NODE_ENV=production  # or development
```

### Ports

- **Frontend**: 3000
- **Backend**: 8000

### Volumes

- **Backend**: Chroma database and environment file
- **Frontend**: Source code (development mode only)

## 🐛 Troubleshooting

### Common Issues

1. **Docker not running**
   ```bash
   # Start Docker Desktop or Docker daemon
   ```

2. **Port already in use**
   ```bash
   # Check what's using the port
   lsof -i :3000
   lsof -i :8000
   
   # Stop conflicting services
   ```

3. **Build fails**
   ```bash
   # Clean Docker cache
   docker system prune -a
   
   # Rebuild without cache
   docker-compose build --no-cache
   ```

4. **Environment file missing**
   ```bash
   # Create .env file
   echo "OPENAI_API_KEY=your_key_here" > Backend/modern_backend/.env
   ```

### Viewing Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend

# Development mode
docker-compose -f docker-compose.dev.yml logs -f
```

### Accessing Containers

```bash
# Backend container
docker-compose exec backend bash

# Frontend container
docker-compose exec frontend sh
```

## 🔄 Development Workflow

### With Hot Reloading (Recommended for Development)

1. Start development mode:
   ```bash
   ./start-dev.sh
   ```

2. Make changes to your code
3. Changes will automatically reload in the browser
4. Stop with `Ctrl+C` or `./stop.sh`

### Without Hot Reloading (Production-like)

1. Start production mode:
   ```bash
   ./start.sh
   ```

2. Make changes to your code
3. Rebuild and restart:
   ```bash
   docker-compose down
   docker-compose up --build -d
   ```

## 📊 Monitoring

### Health Checks

The backend includes health checks that verify the API is responding:
- **Endpoint**: `http://localhost:8000/api/v1/`
- **Interval**: 30 seconds
- **Timeout**: 10 seconds
- **Retries**: 3

### Resource Usage

Monitor container resource usage:
```bash
docker stats
```

## 🧹 Cleanup

### Remove All Data
```bash
# Stop and remove containers, networks, and volumes
docker-compose down -v

# Remove all unused Docker resources
docker system prune -a
```

### Remove Specific Resources
```bash
# Remove only containers
docker-compose down

# Remove containers and networks
docker-compose down --remove-orphans

# Remove specific volumes
docker volume rm soccer-referee-app_chroma_data
```

## 🚀 Deployment

The Docker setup is production-ready and can be deployed to:

- **Docker Swarm**
- **Kubernetes**
- **Cloud platforms** (AWS ECS, Google Cloud Run, Azure Container Instances)
- **VPS/Dedicated servers**

### Production Considerations

1. **Environment Variables**: Use proper secret management
2. **SSL/TLS**: Add reverse proxy (nginx) for HTTPS
3. **Monitoring**: Add logging and monitoring solutions
4. **Backup**: Set up database backups
5. **Scaling**: Configure load balancing and auto-scaling

## 📞 Support

If you encounter issues:

1. Check the troubleshooting section above
2. View container logs: `docker-compose logs -f`
3. Verify environment setup
4. Check Docker and Docker Compose versions

---

**Happy Refereeing!** ⚽️
