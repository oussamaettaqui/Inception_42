#!/bin/bash

if [ -d "/var/lib/mysql/mysql" ] && [ -f "/var/lib/mysql/.initialized" ]; then
    exec "$@"
else
    service mariadb start
    sleep 10
    mariadb -v -u root << EOF
CREATE DATABASE IF NOT EXISTS ${DB_NAME};
CREATE USER IF NOT EXISTS '${DB_USER}'@'%' IDENTIFIED BY '${DB_PASSWORD}';
GRANT ALL PRIVILEGES ON ${DB_NAME}.* TO '${DB_USER}'@'%' IDENTIFIED BY '${DB_PASSWORD}';
ALTER USER 'root'@'localhost' IDENTIFIED BY '${DB_PASS_ROOT}';
FLUSH PRIVILEGES;
EOF

    touch /var/lib/mysql/.initialized
    service mariadb stop
    exec "$@"
fi