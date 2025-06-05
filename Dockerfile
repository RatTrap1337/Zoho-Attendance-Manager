# Use official Node.js runtime as base image
FROM node:18-alpine

# Set working directory in container
WORKDIR /app

# Create a non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodeuser -u 1001

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy application files
COPY . .

# Create directory for token file and set permissions
RUN mkdir -p /app/data && \
    chown -R nodeuser:nodejs /app

# Switch to non-root user
USER nodeuser

# Expose port (if needed for health checks or API)
EXPOSE 3000

# Add health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "console.log('Health check passed')" || exit 1

# Set environment variables
ENV NODE_ENV=production
ENV TOKEN_FILE=/app/data/access_token.json

# Start the application
CMD ["node", "attendance_manager.js"]