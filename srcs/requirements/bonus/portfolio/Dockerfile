


FROM node:18-alpine

# Set working directory
WORKDIR /app

# Create package.json file inline
RUN echo '{"name":"portfolio-website","version":"1.0.0","description":"Portfolio Website","main":"server.js","dependencies":{"express":"^4.18.2"},"scripts":{"start":"node server.js"}}' > package.json

# Install dependencies
RUN npm install

# Create server.js file inline
RUN echo 'const express = require("express"); const app = express(); const PORT = 3000; app.use(express.static("website")); app.listen(PORT, () => { console.log(`Portfolio website running at http://localhost:${PORT}/`); });' > server.js

# Copy website files
COPY website/ /app/website/

# Expose port
EXPOSE 3000

# Start server
CMD ["node", "server.js"]
