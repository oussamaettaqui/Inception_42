FROM debian:bullseye
RUN apt-get update -y && apt-get upgrade -y && \
    apt-get install -y vsftpd ftp && \
    rm -rf /var/lib/apt/lists/*

COPY ./tools/script.sh /script.sh

RUN chmod +x /script.sh

CMD ["/script.sh"]


