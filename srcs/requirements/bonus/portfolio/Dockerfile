
FROM alpine:3.18


RUN apk update && \
    apk add --no-cache nodejs npm


WORKDIR /app


RUN echo '{"name":"portfolio-website","version":"1.0.0","description":"Portfolio Website","main":"server.js","dependencies":{"express":"^4.18.2"},"scripts":{"start":"node server.js"}}' > package.json && \
    echo 'const express = require("express"); const app = express(); const PORT = 3000; app.use(express.static("website")); app.listen(PORT, () => { console.log(`Portfolio website running at http://localhost:${PORT}/`); });' > server.js

RUN npm install && \
    npm cache clean --force


COPY website/ /app/website/


EXPOSE 3000


CMD ["node", "server.js"]