FROM alpine:3.17

# Install dependencies
RUN apk --no-cache add \
    libc6-compat \
    device-mapper \
    findutils \
    && rm -rf /var/cache/apk/*

# Download and install cAdvisor binary
RUN wget -O /usr/local/bin/cadvisor https://github.com/google/cadvisor/releases/download/v0.47.0/cadvisor-v0.47.0-linux-amd64 && \
    chmod +x /usr/local/bin/cadvisor

# cAdvisor port
EXPOSE 9090

# Run cAdvisor
CMD ["/usr/local/bin/cadvisor", "-logtostderr"]


