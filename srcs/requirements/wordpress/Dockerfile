
FROM debian:bullseye

EXPOSE 9000

ARG PHPPATH=/etc/php/7.4/fpm

# Install packages in a single layer and clean up in the same step
RUN apt-get update && apt-get install --no-install-recommends --no-install-suggests -y \
    ca-certificates \
    php7.4-fpm \
    php7.4-mysql \
    php7.4-redis \
    wget \
    tar \
    && rm -rf /var/lib/apt/lists/* \
    && service php7.4-fpm stop \
    # Download and setup WP-CLI
    && wget --no-check-certificate https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar \
    && chmod +x wp-cli.phar \
    && mv wp-cli.phar /usr/local/bin/wp \
    # Create necessary directories
    && mkdir -p /run/php/ \
    && mkdir -p /var/run/php/ \
    && mkdir -p /var/www/html/ \
    && chown -R www-data:www-data /var/www/html/

# Copy configuration files
COPY conf/www.conf ${PHPPATH}/pool.d/
COPY conf/wp-config.php /tmp/
COPY tools/wp_setup.sh /bin/

# Configure PHP in a single layer
RUN sed -i 's/;cgi.fix_pathinfo=1/cgi.fix_pathinfo=0/g' ${PHPPATH}/php.ini \
    && sed -i "s/listen = \/run\/php\/php.*-fpm.sock/listen = 9000/g" ${PHPPATH}/pool.d/www.conf \
    && sed -i 's/;listen.mode = 0660/listen.mode = 0660/g' ${PHPPATH}/pool.d/www.conf \
    && sed -i 's/;daemonize = yes/daemonize = no/g' ${PHPPATH}/pool.d/www.conf \
    && chmod +x /bin/wp_setup.sh

# Use exec form of CMD which is more reliable
CMD ["/bin/wp_setup.sh", "php-fpm7.4", "--nodaemonize"]