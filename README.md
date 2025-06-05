# Zoho Attendance Manager

Automated Zoho attendance check-in/check-out system with Docker support and configurable cron scheduling.

## Features

- 🔐 Secure OAuth token management
- ⏰ Configurable cron job scheduling
- 🐳 Docker containerized deployment
- 🌍 Timezone support
- 📝 Comprehensive logging
- 🔄 Automatic token refresh

## Quick Start

### 1. Setup Environment

```bash
# Clone or create project directory
mkdir zoho-attendance && cd zoho-attendance

# Copy the .env.example to .env and fill in your credentials
cp .env.example .env
```

Edit `.env` file with your Zoho credentials:
```bash
ZOHO_CLIENT_ID=your_actual_client_id
ZOHO_CLIENT_SECRET=your_actual_client_secret  
ZOHO_REFRESH_TOKEN=your_actual_refresh_token
```

### 2. Docker Deployment

```bash
# Build and run with docker-compose
docker-compose up -d

# Or build and run manually
docker build -t zoho-attendance .
docker run -d --name zoho-attendance --env-file .env zoho-attendance
```

### 3. Local Development

```bash
# Install dependencies
npm install

# Start the scheduler
npm start

# Test manually
npm run test-checkin
npm run test-checkout
```

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `ZOHO_CLIENT_ID` | Zoho OAuth Client ID | Required |
| `ZOHO_CLIENT_SECRET` | Zoho OAuth Client Secret | Required |
| `ZOHO_REFRESH_TOKEN` | Zoho OAuth Refresh Token | Required |
| `CHECKIN_TIME` | Cron schedule for check-in | `0 9 * * 1-5` (9 AM Mon-Fri) |
| `CHECKOUT_TIME` | Cron schedule for check-out | `30 17 * * 1-5` (5:30 PM Mon-Fri) |
| `TIMEZONE` | Timezone for cron jobs | `Europe/Berlin` |
| `TOKEN_FILE` | Path to store access token | `access_token.json` |

### Cron Schedule Format

Use standard cron format: `minute hour day month day-of-week`

Examples:
- `0 9 * * 1-5` - 9:00 AM, Monday to Friday
- `30 17 * * 1-5` - 5:30 PM, Monday to Friday
- `0 8 * * *` - 8:00 AM, every day
- `0 18 1-15 * 1-5` - 6:00 PM, first 15 days, weekdays only

## Docker Commands

```bash
# View logs
docker-compose logs -f zoho-attendance

# Restart service
docker-compose restart zoho-attendance

# Stop service
docker-compose down

# Rebuild and restart
docker-compose up -d --build
```

## File Structure

```
zoho-attendance/
├── zoho_token_manager.js    # OAuth token management
├── attendance_manager.js    # Main attendance logic
├── package.json            # Dependencies
├── Dockerfile              # Docker build instructions
├── docker-compose.yml      # Docker compose configuration
├── .env.example           # Environment template
├── .dockerignore          # Docker ignore rules
├── data/                  # Persistent token storage
└── logs/                  # Application logs (optional)
```

## Getting Zoho OAuth Credentials

1. Go to [Zoho Developer Console](https://api-console.zoho.com/)
2. Create a new application
3. Generate OAuth credentials
4. Get refresh token using OAuth flow
5. Add credentials to `.env` file

## Troubleshooting

### Check container status
```bash
docker-compose ps
docker-compose logs zoho-attendance
```

### Test token manually
```bash
docker-compose exec zoho-attendance node -e "
require('./zoho_token_manager').getAccessToken()
  .then(token => console.log('Token:', token))
  .catch(err => console.error('Error:', err.message))
"
```

### Verify cron schedule
```bash
# Check if cron expressions are valid
docker-compose exec zoho-attendance node -e "
const cron = require('node-cron');
console.log('Check-in schedule valid:', cron.validate(process.env.CHECKIN_TIME));
console.log('Check-out schedule valid:', cron.validate(process.env.CHECKOUT_TIME));
"
```

## Security Notes

- Never commit `.env` file to version control
- Use Docker secrets in production
- Token file is automatically generated and managed
- Container runs as non-root user for security

## License

MIT