
FROM debian:bullseye

EXPOSE 9000

ARG PHPPATH=/etc/php/7.4/fpm


RUN apt-get update && apt-get install --no-install-recommends --no-install-suggests -y \
    ca-certificates \
    php7.4-fpm \
    php7.4-mysql \
    php7.4-redis \
    wget \
    tar \
    && rm -rf /var/lib/apt/lists/* \
    && service php7.4-fpm stop \

    && wget --no-check-certificate https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar \
    && chmod +x wp-cli.phar \
    && mv wp-cli.phar /usr/local/bin/wp \

    && mkdir -p /run/php/ \
    && mkdir -p /var/run/php/ \
    && mkdir -p /var/www/html/ \
    && chown -R www-data:www-data /var/www/html/


COPY conf/www.conf ${PHPPATH}/pool.d/
COPY conf/wp-config.php /tmp/
COPY tools/wp_setup.sh /bin/

RUN sed -i 's/;cgi.fix_pathinfo=1/cgi.fix_pathinfo=0/g' ${PHPPATH}/php.ini \
    && sed -i "s/listen = \/run\/php\/php.*-fpm.sock/listen = 9000/g" ${PHPPATH}/pool.d/www.conf \
    && sed -i 's/;listen.mode = 0660/listen.mode = 0660/g' ${PHPPATH}/pool.d/www.conf \
    && sed -i 's/;daemonize = yes/daemonize = no/g' ${PHPPATH}/pool.d/www.conf \
    && chmod +x /bin/wp_setup.sh


CMD ["/bin/wp_setup.sh", "php-fpm7.4", "--nodaemonize"]