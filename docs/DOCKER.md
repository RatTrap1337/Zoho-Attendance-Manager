# 🐳 Docker Learning Guide

> ⚠️ **Educational Purpose Only** - This guide teaches Docker concepts through practical examples. Never use these containers in production.

Learn Docker containerization concepts, best practices, and deployment patterns through hands-on exploration.

## 🎓 Learning Objectives

After completing this guide, you'll understand:
- Docker fundamentals and containerization concepts
- Multi-stage build optimization techniques
- Container security best practices
- Docker Compose orchestration patterns
- Development vs production container strategies
- Volume management and data persistence
- Network configuration and service communication

## 📋 Docker Fundamentals

### What is Docker?
Docker is a containerization platform that packages applications and their dependencies into lightweight, portable containers.

```bash
# Learn basic Docker concepts
docker --version
docker info
```

### Key Concepts to Study

#### Images vs Containers
```bash
# Images are templates (blueprints)
docker images

# Containers are running instances
docker ps
docker ps -a  # Include stopped containers
```

#### Dockerfile Learning
```dockerfile
# Study our multi-stage Dockerfile
FROM node:18-alpine AS base
# Learn about base image selection

FROM base AS dependencies  
# Study dependency isolation

FROM base AS production
# Learn production optimization
```

## 🏗️ Dockerfile Deep Dive

### Our Educational Dockerfile Explained

```dockerfile
# Multi-stage build for learning optimization
FROM node:18-alpine AS base

# Learn about working directories
WORKDIR /app

# Study layer caching optimization
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Learn about file copying strategies
COPY . .

# Study security - create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodeuser -u 1001

# Learn about permission management
RUN mkdir -p /app/data && \
    chown -R nodeuser:nodejs /app

# Study user context switching
USER nodeuser

# Learn about port exposure
EXPOSE 3000

# Study health check implementation
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "console.log('Health check passed')" || exit 1

# Learn about environment variables
ENV NODE_ENV=production
ENV TOKEN_FILE=/app/data/access_token.json

# Study container startup
CMD ["node", "attendance_manager.js"]
```

### Learning Exercises

#### 1. Build Process Study
```bash
# Build and study each stage
docker build --target base -t attendance-base .
docker build --target dependencies -t attendance-deps .
docker build -t attendance-edu .

# Study build history and layers
docker history attendance-edu
```

#### 2. Image Analysis
```bash
# Learn image inspection
docker inspect attendance-edu

# Study image size optimization
docker images | grep attendance

# Learn layer composition
docker dive attendance-edu  # Install dive tool first
```

#### 3. Container Lifecycle Learning
```bash
# Study container creation
docker create --name learning-container attendance-edu

# Learn container starting
docker start learning-container

# Study container inspection
docker inspect learning-container

# Learn container stopping
docker stop learning-container

# Study container removal
docker rm learning-container
```

## 🔧 Development vs Production Patterns

### Development Dockerfile
```dockerfile
# Dockerfile.dev - For learning development patterns
FROM node:18-alpine

WORKDIR /app

# Development dependencies
COPY package*.json ./
RUN npm install  # Include dev dependencies

# Volume mount for live reloading
COPY . .

# Development user (less security for convenience)
USER node

# Development port
EXPOSE 3000

# Development command with hot reload
CMD ["npm", "run", "dev"]
```

### Development Build and Run
```bash
# Build development image
docker build -f Dockerfile.dev -t attendance-dev .

# Run with volume mounting for live reload
docker run -d \
    --name attendance-dev \
    -v $(pwd):/app \
    -v /app/node_modules \
    -p 3000:3000 \
    --env-file .env \
    attendance-dev

# Study live reload
echo "// Learning change" >> attendance_manager.js
docker logs attendance-dev
```

### Production Patterns Study
```bash
# Study production build
docker build -t attendance-prod .

# Learn production security
docker run --rm attendance-prod id  # Should show non-root user

# Study production environment
docker run --rm -e NODE_ENV=production attendance-prod env
```

## 🎼 Docker Compose Learning

### Basic Compose Configuration
```yaml
# docker-compose.yml - Study orchestration
version: '3.8'

services:
  # Main application service
  app:
    build: .
    container_name: zoho-attendance-edu
    restart: unless-stopped
    environment:
      - NODE_ENV=production
      - TOKEN_FILE=/app/data/access_token.json
    env_file:
      - .env
    volumes:
      - ./data:/app/data
      - ./logs:/app/logs
    deploy:
      resources:
        limits:
          memory: 128M
        reservations:
          memory: 64M
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"

networks:
  default:
    driver: bridge
```

### Development Compose Configuration
```yaml
# docker-compose.dev.yml - Learning development setup
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile.dev
    container_name: zoho-attendance-dev
    volumes:
      - .:/app
      - /app/node_modules
    ports:
      - "3000:3000"
      - "9229:9229"  # Debug port
    environment:
      - NODE_ENV=development
      - DEBUG=*
    env_file:
      - .env
    command: npm run dev

  # Learning: Add monitoring service
  monitor:
    image: nicolaka/netshoot
    container_name: network-monitor
    command: sleep infinity
    depends_on:
      - app
```

### Compose Learning Commands
```bash
# Study compose operations
docker-compose config  # Validate and view configuration
docker-compose up --build  # Build and start
docker-compose ps  # View running services
docker-compose logs -f app  # Follow logs
docker-compose exec app sh  # Access container shell
docker-compose down  # Stop and remove

# Learn development workflow
docker-compose -f docker-compose.dev.yml up
```

## 📊 Volume Management Learning

### Types of Volumes
```bash
# Named volumes (managed by Docker)
docker volume create attendance-data
docker volume ls
docker volume inspect attendance-data

# Bind mounts (host directory mapping)
docker run -v $(pwd)/data:/app/data attendance-edu

# Tmpfs mounts (memory storage)
docker run --tmpfs /tmp attendance-edu
```

### Volume Learning Exercises
```bash
# Study data persistence
docker run -d --name test1 -v data-vol:/app/data attendance-edu
docker exec test1 touch /app/data/test-file
docker rm -f test1

# Verify persistence
docker run --name test2 -v data-vol:/app/data alpine ls /app/data
docker rm test2
docker volume rm data-vol
```

### Docker Compose Volumes
```yaml
services:
  app:
    volumes:
      # Bind mount for development
      - .:/app
      # Named volume for data persistence
      - app-data:/app/data
      # Anonymous volume for node_modules
      - /app/node_modules

volumes:
  app-data:
    driver: local
```

## 🌐 Networking Concepts

### Network Learning
```bash
# Study default networks
docker network ls

# Create custom network
docker network create attendance-net

# Inspect network configuration
docker network inspect attendance-net

# Run containers on custom network
docker run -d --name app1 --network attendance-net attendance-edu
docker run -d --name app2 --network attendance-net attendance-edu

# Test inter-container communication
docker exec app1 ping app2
```

### Compose Networking
```yaml
version: '3.8'

services:
  app:
    networks:
      - frontend
      - backend
  
  database:
    image: postgres:13
    networks:
      - backend

networks:
  frontend:
    driver: bridge
  backend:
    driver: bridge
    internal: true  # No external access
```

## 🔒 Security Best Practices Study

### User Security Learning
```dockerfile
# Study non-root user creation
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodeuser -u 1001

# Learn permission management
RUN chown -R nodeuser:nodejs /app

# Study user switching
USER nodeuser
```

### Security Scanning
```bash
# Learn vulnerability scanning
docker scout cves attendance-edu

# Study image security
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
    -v $(pwd):/root/.cache/ \
    aquasec/trivy image attendance-edu
```

### Secrets Management
```bash
# Study Docker secrets (Swarm mode)
echo "secret-value" | docker secret create my-secret -

# Learn environment variable security
docker run --rm attendance-edu env | grep -E "(PASSWORD|SECRET|TOKEN)"
```

## 📈 Monitoring and Logging

### Container Monitoring
```bash
# Study resource usage
docker stats attendance-edu

# Learn container inspection
docker inspect attendance-edu | jq '.State'

# Study process monitoring
docker exec attendance-edu ps aux
```

### Logging Strategies
```yaml
# docker-compose.yml logging configuration
services:
  app:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
        labels: "service=attendance"
```

### Log Analysis
```bash
# Study container logs
docker logs attendance-edu
docker logs --follow --tail 100 attendance-edu

# Learn log filtering
docker logs attendance-edu 2>&1 | grep ERROR

# Study log drivers
docker info | grep "Logging Driver"
```

## 🚀 Advanced Patterns

### Multi-Architecture Builds
```bash
# Learn about buildx
docker buildx create --name mybuilder
docker buildx use mybuilder

# Study multi-platform builds
docker buildx build --platform linux/amd64,linux/arm64 -t attendance-multi .
```

### Health Checks
```dockerfile
# Study health check implementation
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "console.log('Health check')" || exit 1
```

```bash
# Monitor health status
docker ps  # Shows health status
docker inspect attendance-edu | jq '.State.Health'
```

### Container Optimization
```bash
# Study image size optimization
docker images | grep attendance

# Learn layer optimization
docker history attendance-edu

# Study .dockerignore usage
cat .dockerignore
```

## 🔧 Debugging Techniques

### Container Debugging
```bash
# Enter running container
docker exec -it attendance-edu sh

# Study container filesystem
docker exec attendance-edu find /app -type f -name "*.js"

# Learn process debugging
docker exec attendance-edu top

# Study environment debugging
docker exec attendance-edu env
```

### Build Debugging
```bash
# Study build process
docker build --no-cache --progress=plain -t attendance-debug .

# Learn intermediate image inspection
docker run --rm -it <intermediate-image-id> sh
```

### Compose Debugging
```bash
# Study service dependencies
docker-compose config --services

# Learn network debugging
docker-compose exec app nslookup google.com

# Study volume debugging
docker-compose exec app ls -la /app/data
```

## 📚 Docker Best Practices

### Dockerfile Optimization
1. **Use multi-stage builds** for size reduction
2. **Leverage layer caching** with proper ordering
3. **Use specific image tags** instead of `latest`
4. **Run as non-root user** for security
5. **Use .dockerignore** to reduce context size

### Security Practices
1. **Scan images** for vulnerabilities
2. **Use minimal base images** (Alpine, Distroless)
3. **Keep images updated** regularly
4. **Limit container capabilities**
5. **Use secrets management**

### Performance Optimization
1. **Minimize layers** where possible
2. **Use build cache** effectively
3. **Optimize for container registry**
4. **Monitor resource usage**
5. **Use health checks** appropriately

## 🎯 Learning Exercises

### Exercise 1: Build Optimization
```bash
# Compare different base images
docker build -f Dockerfile.alpine -t attendance-alpine .
docker build -f Dockerfile.ubuntu -t attendance-ubuntu .
docker images | grep attendance
```

### Exercise 2: Security Analysis
```bash
# Scan for vulnerabilities
docker scout cves attendance-edu

# Check for non-root user
docker run --rm attendance-edu whoami
```

### Exercise 3: Performance Testing
```bash
# Monitor resource usage
docker stats --no-stream attendance-edu

# Test memory limits
docker run -m 64m attendance-edu
```

## ⚠️ Educational Reminders

### Safe Learning Practices
- ✅ Use educational/test environments only
- ✅ Study container patterns and best practices
- ✅ Learn security and optimization techniques
- ✅ Practice debugging and monitoring
- ✅ Understand Docker networking concepts

### Avoid in Learning
- ❌ Don't use production credentials in containers
- ❌ Don't expose sensitive ports to public networks
- ❌ Don't ignore security scanning results
- ❌ Don't use containers for actual automation
- ❌ Don't deploy without understanding implications

---

**Remember: Docker is a powerful tool for learning about application deployment, scaling, and management. Focus on understanding the concepts and best practices rather than the specific application functionality.**
