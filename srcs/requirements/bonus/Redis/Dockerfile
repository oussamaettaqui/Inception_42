FROM debian:buster

RUN		apt-get update
RUN		apt-get install -y redis \
		&& rm -rf /var/lib/apt/lists/*

COPY ./tools/script.sh /tmp/script.sh

EXPOSE 6379

CMD ["sh", "/tmp/script.sh"]