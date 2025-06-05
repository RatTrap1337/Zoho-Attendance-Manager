# Zoho Attendance Manager

> ⚠️ **EDUCATIONAL PURPOSE ONLY** - This project is created solely for learning and educational purposes. **NOT for production use.** Please read the [DISCLAIMER](DISCLAIMER.md) before proceeding.

Educational demonstration of automated Zoho People attendance API integration with Docker support and configurable cron scheduling.

## 🎓 Educational Purpose

This project serves as a **learning resource** for:
- OAuth 2.0 authentication flow implementation
- RESTful API integration with error handling
- Docker containerization and multi-stage builds
- Environment variable management and security
- Cron job scheduling and automation concepts
- Node.js best practices and async/await patterns

## ⚠️ Important Notice

**Please read the [DISCLAIMER](DISCLAIMER.md) for critical information about:**
- Why this is educational only and never for production
- Serious legal, ethical, and professional consequences
- Security, compliance, and reliability concerns
- Proper educational usage guidelines
- Alternative learning approaches

## ✨ Learning Features

- 🔐 **OAuth 2.0 Implementation**: Learn secure token management and refresh flows
- ⏰ **Cron Job Automation**: Understand scheduling and task automation concepts
- 🐳 **Docker Best Practices**: Multi-stage builds, security, and containerization
- 🌍 **Environment Configuration**: Secure credential management patterns
- 📝 **API Integration**: REST API patterns and error handling strategies
- 🔄 **Token Lifecycle**: Automatic refresh and storage mechanisms

## 📖 Educational Setup

**For learning and development purposes only:**

### 1. Setup Environment (Development Only)

```bash
# Clone for educational study
git clone [repository-url]
cd zoho-attendance

# Copy the educational environment template
cp .env.example .env
```

**Important**: Only use test/development Zoho accounts, never production accounts.

Edit `.env` file with **test credentials only**:
```bash
# Use ONLY test/development Zoho credentials
ZOHO_CLIENT_ID=your_test_client_id
ZOHO_CLIENT_SECRET=your_test_client_secret  
ZOHO_REFRESH_TOKEN=your_test_refresh_token
```

### 2. Educational Docker Deployment

```bash
# Study the Docker build process
docker-compose up -d

# Or examine manual Docker usage
docker build -t zoho-attendance-edu .
docker run -d --name zoho-attendance-edu --env-file .env zoho-attendance-edu
```

### 3. Educational Local Development

```bash
# Learn about dependency management
npm install

# Study the cron scheduler implementation
npm start

# Examine manual API testing (development only)
npm run test-checkin
npm run test-checkout
```

## 📚 Learning Documentation

- [⚠️ DISCLAIMER](DISCLAIMER.md) - **READ FIRST** - Educational purpose and critical warnings
- [🔧 Development Setup](docs/DEVELOPMENT.md) - Learning environment configuration
- [🐳 Docker Learning](docs/DOCKER.md) - Containerization concepts
- [🔐 OAuth Learning](docs/OAUTH.md) - Authentication flow understanding

## 🎮 Educational Exploration

**For learning purposes only:**

### Configuration Learning
Study how environment variables control behavior:

| Variable | Learning Purpose | Educational Default |
|----------|------------------|-------------------|
| `ZOHO_CLIENT_ID` | OAuth client identification | Required for API learning |
| `ZOHO_CLIENT_SECRET` | OAuth client authentication | Secure credential handling |
| `ZOHO_REFRESH_TOKEN` | Long-lived token management | Token lifecycle understanding |
| `CHECKIN_TIME` | Cron schedule syntax | `0 9 * * 1-5` (learning example) |
| `CHECKOUT_TIME` | Automation timing concepts | `30 17 * * 1-5` (educational) |
| `TIMEZONE` | Time zone handling | `Europe/Berlin` (example) |

### Code Learning Points
- **OAuth Flow**: See `zoho_token_manager.js` for token refresh patterns
- **API Integration**: Study `attendance_manager.js` for REST API usage
- **Error Handling**: Examine retry mechanisms and failure scenarios
- **Docker Patterns**: Learn multi-stage builds and security practices
- **Cron Concepts**: Understand scheduling syntax and automation

### Cron Schedule Format

Use standard cron format: `minute hour day month day-of-week`

Examples:
- `0 9 * * 1-5` - 9:00 AM, Monday to Friday
- `30 17 * * 1-5` - 5:30 PM, Monday to Friday
- `0 8 * * *` - 8:00 AM, every day
- `0 18 1-15 * 1-5` - 6:00 PM, first 15 days, weekdays only

## 🔧 Educational Docker Commands

**For learning container concepts:**

```bash
# Study build process and layers
docker-compose logs -f zoho-attendance

# Examine container lifecycle
docker-compose restart zoho-attendance

# Learn about container management
docker-compose down

# Practice build optimization
docker-compose up -d --build
```

## 🏗️ Learning Architecture

Study how the components work together:

- **OAuth Manager** (`zoho_token_manager.js`): Token lifecycle and refresh patterns
- **Attendance Logic** (`attendance_manager.js`): API integration and error handling  
- **Docker Configuration**: Multi-stage builds and security practices
- **Environment Management**: Configuration and secrets handling
- **Cron Scheduling**: Automation timing and reliability concepts

### Educational API Flow

1. **Token Management**: Learn OAuth 2.0 refresh flow implementation
2. **API Integration**: Study REST API call patterns and error handling
3. **Scheduling**: Understand cron job concepts and timing
4. **Containerization**: Explore Docker best practices and deployment

## 🔒 Educational Security Notes

**Learn about security concepts:**
- Environment variable management (never commit `.env`)
- OAuth token lifecycle and refresh mechanisms  
- Container security and non-root execution
- API rate limiting and error handling
- Credential rotation and management

## 📝 Educational License

[GPL License](LICENSE) - Free for educational use, modification, and learning!

**Remember**: All usage should maintain educational focus and ethical boundaries.

## ⚠️ Final Educational Reminder

**This project is for learning purposes only.**

- ❌ **NEVER use for actual attendance automation**
- ❌ **DO NOT deploy in workplace environments**  
- ❌ **DO NOT use with production Zoho accounts**
- ❌ **DO NOT encourage others to use in production**
- ✅ **DO use for learning API development concepts**
- ✅ **DO study OAuth 2.0 implementation patterns**
- ✅ **DO explore Docker containerization techniques**
- ✅ **DO understand automation concepts safely**

## 🎓 Educational Support

- 🐛 [Report learning issues](https://github.com/RatTrap1337/Zoho-Attendance-Browser-Extension/issues)
- 💡 [Suggest educational improvements](https://github.com/RatTrap1337/Zoho-Attendance-Browser-Extension/issues)
- 💬 [Educational discussions](https://github.com/RatTrap1337/Zoho-Attendance-Browser-Extension/discussions)

---

**Made with ❤️ for learning and education**

**Professional integrity and honest attendance tracking protect everyone. Use your development skills to build legitimate, helpful tools that make workplaces better for everyone.**

> 🔗 **Related**: Check out our [Browser Extension version](https://github.com/RatTrap1337/Zoho-Attendance-Browser-Extension) for learning client-side automation concepts!
