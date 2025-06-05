# 🔧 Development Setup

> ⚠️ **Educational Purpose Only** - This guide is for learning development concepts only. Never use in production environments.

This guide walks you through setting up a development environment to learn about API automation, OAuth flows, and Docker containerization.

## 🎓 Learning Objectives

After following this guide, you'll understand:
- Node.js project structure and dependency management
- Environment variable configuration and security
- OAuth 2.0 development workflow
- Docker development vs production patterns
- API testing and debugging techniques

## 📋 Prerequisites

### Required Software
```bash
# Node.js (for learning JavaScript backend development)
node >= 16.0.0
npm >= 8.0.0

# Docker (for learning containerization)
docker >= 20.0.0
docker-compose >= 2.0.0

# Git (for version control learning)
git >= 2.30.0
```

### Educational Accounts Needed
- **Test Zoho Developer Account** (never use production accounts)
- **Git repository** for learning version control
- **Code editor** (VS Code recommended for learning)

## 🚀 Initial Setup

### 1. Clone for Educational Study
```bash
# Clone the educational repository
git clone [your-repo-url]
cd zoho-attendance-api

# Study the project structure
ls -la
cat README.md
cat DISCLAIMER.md  # READ FIRST!
```

### 2. Environment Configuration Learning

#### Create Development Environment
```bash
# Copy the educational template
cp .env.example .env

# Study the environment structure
cat .env.example
```

#### Configure Educational Variables
Edit `.env` with **test/development credentials only**:

```bash
# OAuth Learning Credentials (TEST ONLY)
ZOHO_CLIENT_ID=your_test_client_id
ZOHO_CLIENT_SECRET=your_test_client_secret
ZOHO_REFRESH_TOKEN=your_test_refresh_token

# Learning Configuration
TOKEN_FILE=./data/access_token.json
CHECKIN_TIME=0 9 * * 1-5
CHECKOUT_TIME=30 17 * * 1-5
TIMEZONE=Europe/Berlin
NODE_ENV=development

# Logging for Learning
LOG_LEVEL=debug
LOG_FILE=./logs/app.log
```

### 3. Dependency Learning
```bash
# Study package.json structure
cat package.json

# Learn about dependency management
npm install

# Examine node_modules (educational)
ls node_modules/ | head -10

# Study package-lock.json
head -20 package-lock.json
```

## 🛠️ Development Environment

### Code Organization Learning

#### Authentication Layer (`src/auth/`)
```javascript
// zoho_token_manager.js - Study OAuth patterns
class ZohoTokenManager {
    async refreshToken() {
        // Learn token refresh flow
    }
    
    async getValidToken() {
        // Study token validation
    }
}
```

#### Service Layer (`src/services/`)
```javascript
// attendance_manager.js - Study API integration
class AttendanceManager {
    async checkIn() {
        // Learn API call patterns
    }
    
    async checkOut() {
        // Study error handling
    }
}
```

#### Utility Layer (`src/utils/`)
```javascript
// logger.js - Study logging patterns
const winston = require('winston');

// config.js - Study configuration management
const config = {
    zoho: {
        clientId: process.env.ZOHO_CLIENT_ID,
        // Learn environment variable usage
    }
};
```

## 🧪 Development Workflow

### 1. Code Study Process
```bash
# Study the main application flow
node -e "console.log('Learning Node.js execution')"

# Examine token management (development only)
npm run test-token

# Study API integration patterns
npm run test-api

# Learn error handling
npm run test-errors
```

### 2. Development Scripts

#### Package.json Learning Scripts
```json
{
  "scripts": {
    "dev": "nodemon src/app.js",
    "start": "node src/app.js",
    "test": "jest",
    "test:token": "node scripts/test-token.js",
    "test:api": "node scripts/test-api.js",
    "lint": "eslint src/",
    "format": "prettier --write src/",
    "docker:build": "docker build -t zoho-attendance-edu .",
    "docker:run": "docker run --env-file .env zoho-attendance-edu"
  }
}
```

#### Development Commands
```bash
# Learn about hot reloading
npm run dev

# Study production simulation
npm start

# Learn testing patterns
npm test

# Study code quality tools
npm run lint
npm run format
```

### 3. Debugging Techniques

#### Debug Configuration (VS Code)
```json
// .vscode/launch.json - Learn debugging setup
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Debug App",
            "type": "node",
            "request": "launch",
            "program": "${workspaceFolder}/src/app.js",
            "env": {
                "NODE_ENV": "development"
            },
            "envFile": "${workspaceFolder}/.env",
            "console": "integratedTerminal"
        }
    ]
}
```

#### Logging for Learning
```javascript
// Study different log levels
const logger = require('./src/utils/logger');

logger.debug('Learning debug information');
logger.info('Educational info message');
logger.warn('Learning warning example');
logger.error('Educational error handling');
```

## 🔍 Testing for Learning

### Unit Testing Patterns
```javascript
// tests/unit/token-manager.test.js
const TokenManager = require('../../src/auth/zoho_token_manager');

describe('Token Manager Learning', () => {
    test('should understand token validation', async () => {
        // Learn testing patterns
        const manager = new TokenManager();
        expect(manager).toBeDefined();
    });
});
```

### Integration Testing Concepts
```javascript
// tests/integration/api.test.js
describe('API Integration Learning', () => {
    test('should demonstrate error handling', async () => {
        // Learn API testing patterns
        // Use mock responses for educational testing
    });
});
```

### Testing Commands
```bash
# Learn unit testing
npm run test:unit

# Study integration testing
npm run test:integration

# Learn coverage reporting
npm run test:coverage

# Study test debugging
npm run test:debug
```

## 🐳 Docker Development Learning

### Development Docker Setup
```bash
# Study Dockerfile structure
cat Dockerfile

# Learn multi-stage builds
docker build -t zoho-attendance-edu .

# Study container inspection
docker inspect zoho-attendance-edu

# Learn about layers
docker history zoho-attendance-edu
```

### Docker Compose for Learning
```yaml
# docker-compose.dev.yml - Development configuration
version: '3.8'
services:
  app:
    build: .
    volumes:
      - .:/app                    # Learn about volume mounting
      - /app/node_modules        # Study node_modules optimization
    environment:
      - NODE_ENV=development     # Learn environment differences
    ports:
      - "3000:3000"             # Study port mapping
    command: npm run dev         # Learn development commands
```

### Development Docker Commands
```bash
# Learn development setup
docker-compose -f docker-compose.dev.yml up

# Study container logs
docker-compose logs -f app

# Learn container interaction
docker-compose exec app /bin/sh

# Study volume mounting
docker-compose exec app ls -la /app
```

## 🔧 Configuration Management

### Environment Learning
```bash
# Study different environments
NODE_ENV=development npm start
NODE_ENV=test npm test
NODE_ENV=production npm start  # Educational only!
```

### Configuration Patterns
```javascript
// src/config/environments.js
const environments = {
    development: {
        logLevel: 'debug',
        apiTimeout: 10000,
        retryAttempts: 3
    },
    test: {
        logLevel: 'error',
        apiTimeout: 5000,
        retryAttempts: 1
    }
};

module.exports = environments[process.env.NODE_ENV || 'development'];
```

## 📊 Monitoring and Logging

### Development Monitoring
```javascript
// Learn about application monitoring
const monitor = {
    requestCount: 0,
    errorCount: 0,
    lastActivity: null,
    
    logRequest() {
        this.requestCount++;
        this.lastActivity = new Date();
        console.log(`Educational: Request #${this.requestCount}`);
    }
};
```

### Log Analysis Learning
```bash
# Study log patterns
tail -f logs/app.log

# Learn log filtering
grep "ERROR" logs/app.log

# Study log rotation
logrotate --dry-run logrotate.conf
```

## 🔒 Security in Development

### Credential Management Learning
```bash
# Study .env patterns
echo "ZOHO_CLIENT_ID=test123" >> .env.local

# Learn about .gitignore
cat .gitignore | grep -E "\.(env|key|pem)$"

# Study secret management
npm install --save-dev dotenv-vault  # Educational example
```

### Security Best Practices Study
```javascript
// Learn input validation
const Joi = require('joi');

const envSchema = Joi.object({
    ZOHO_CLIENT_ID: Joi.string().required(),
    ZOHO_CLIENT_SECRET: Joi.string().required(),
    NODE_ENV: Joi.string().valid('development', 'test', 'production')
});

// Validate configuration
const { error } = envSchema.validate(process.env);
if (error) {
    console.error('Educational: Environment validation failed:', error.message);
}
```

## 🚀 Deployment Learning (Educational Only)

### Staging Environment Concepts
```bash
# Learn staging deployment
NODE_ENV=staging docker-compose up

# Study blue-green deployment concepts
docker-compose -f docker-compose.blue.yml up
docker-compose -f docker-compose.green.yml up
```

### CI/CD Learning Patterns
```yaml
# .github/workflows/educational.yml
name: Educational CI/CD
on: [push]
jobs:
  learn:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Learn Node.js setup
        uses: actions/setup-node@v3
        with:
          node-version: '16'
      - name: Study dependency installation
        run: npm ci
      - name: Learn testing
        run: npm test
      - name: Study linting
        run: npm run lint
```

## 📚 Learning Resources

### Documentation to Study
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [Docker Development Guide](https://docs.docker.com/develop/)
- [OAuth 2.0 RFC](https://tools.ietf.org/html/rfc6749)
- [REST API Design](https://restfulapi.net/)

### Educational Tools
```bash
# Study code quality
npm install -g eslint prettier

# Learn about security scanning
npm audit

# Study dependency analysis
npm ls --depth=0

# Learn about performance monitoring
npm install --save-dev clinic
```

## ⚠️ Development Reminders

### Always Remember
- ✅ Use **test/development accounts only**
- ✅ Keep credentials in `.env` (never commit)
- ✅ Study code patterns and best practices
- ✅ Learn from error messages and logs
- ✅ Practice proper testing techniques

### Never Do
- ❌ Use production Zoho accounts
- ❌ Commit sensitive credentials
- ❌ Deploy to production environments
- ❌ Test against live company systems
- ❌ Share credentials in code or docs

---

**Remember: This is all for learning! Focus on understanding the patterns, architectures, and best practices rather than the specific functionality.**
