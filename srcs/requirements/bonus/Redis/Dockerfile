


FROM alpine:3.18

# Install redis and clean up in one layer
RUN apk update && \
    apk add --no-cache redis && \
    # Create redis data directory if needed
    mkdir -p /data

# Copy script
COPY ./tools/script.sh /tmp/script.sh

# Expose Redis port
EXPOSE 6379

# Run the script
CMD ["sh", "/tmp/script.sh"]