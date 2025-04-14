


FROM alpine:3.18


RUN apk update && \
    apk add --no-cache redis && \
    mkdir -p /data


COPY ./tools/script.sh /tmp/script.sh


EXPOSE 6379


CMD ["sh", "/tmp/script.sh"]