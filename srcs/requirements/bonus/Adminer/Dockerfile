FROM alpine:3.18

RUN apk update && apk add --no-cache \
    php81 \
    php81-fpm \
    php81-gd \
    php81-pdo \
    php81-pdo_mysql \
    php81-mysqli \
    php81-session \
    php81-json \
    php81-openssl \
    php81-mbstring \
    php81-ctype \
    wget \
    freetype \
    libpng \
    libjpeg-turbo


RUN mkdir -p /var/www/html


WORKDIR /var/www/html
RUN wget -O index.php https://github.com/vrana/adminer/releases/download/v4.8.1/adminer-4.8.1.php && \
    chmod 644 index.php


RUN mkdir -p /etc/php81/conf.d && \
    echo 'upload_max_filesize = 64M' > /etc/php81/conf.d/custom.ini && \
    echo 'post_max_size = 64M' >> /etc/php81/conf.d/custom.ini && \
    echo 'memory_limit = 128M' >> /etc/php81/conf.d/custom.ini


EXPOSE 8080

CMD ["php81", "-S", "0.0.0.0:8080", "-t", "/var/www/html"]