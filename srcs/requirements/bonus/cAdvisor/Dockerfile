FROM debian:bullseye

RUN apt-get update && apt-get install -y \
    wget \
    && rm -rf /var/lib/apt/lists/*


RUN wget -O /usr/local/bin/cadvisor https://github.com/google/cadvisor/releases/download/v0.46.0/cadvisor-v0.46.0-linux-amd64 && \
    chmod +x /usr/local/bin/cadvisor

EXPOSE 8084

CMD ["/usr/local/bin/cadvisor", "--port=8084"]