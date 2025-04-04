
FROM alpine:3.18

# Install Node.js and npm
RUN apk update && \
    apk add --no-cache nodejs npm

# Set working directory
WORKDIR /app

# Create package.json and server.js file inline in a single layer
RUN echo '{"name":"portfolio-website","version":"1.0.0","description":"Portfolio Website","main":"server.js","dependencies":{"express":"^4.18.2"},"scripts":{"start":"node server.js"}}' > package.json && \
    echo 'const express = require("express"); const app = express(); const PORT = 3000; app.use(express.static("website")); app.listen(PORT, () => { console.log(`Portfolio website running at http://localhost:${PORT}/`); });' > server.js

# Install dependencies
RUN npm install && \
    npm cache clean --force

# Copy website files
COPY website/ /app/website/

# Expose port
EXPOSE 3000

# Start server
CMD ["node", "server.js"]