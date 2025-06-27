FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Build production version
RUN npm run build

# Debug: List contents to see what was built
RUN ls -la
RUN ls -la dist/ || ls -la build/ || echo "No dist or build directory found"

# Install static file server
RUN npm install -g serve

# Expose port (React production served on 3000)
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --spider http://localhost:3000 || exit 1

# Serve built app
CMD ["sh", "-c", "if [ -d 'dist' ]; then serve -s dist -l 3000; elif [ -d 'build' ]; then serve -s build -l 3000; else echo 'No build output found' && exit 1; fi"]