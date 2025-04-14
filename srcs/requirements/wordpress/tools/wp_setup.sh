
#!/bin/bash


chown -R www-data:www-data /var/www/html/

if [ ! -f "/var/www/html/wp-config.php" ]; then
   mv /tmp/wp-config.php /var/www/html/
fi

sleep 10

wp --allow-root --path="/var/www/html/" core download || true

if ! wp --allow-root --path="/var/www/html/" core is-installed;
then
    wp  --allow-root --path="/var/www/html/" core install \
        --url=$WP_URL \
        --title=$WP_TITLE \
        --admin_user=$WP_ADMIN_USER \
        --admin_password=$WP_ADMIN_PASSWORD \
        --admin_email=$WP_ADMIN_EMAIL
fi;

if ! wp --allow-root --path="/var/www/html/" user get $WP_USER;
then
    wp  --allow-root --path="/var/www/html/" user create \
        $WP_USER \
        $WP_USER_EMAIL \
        --user_pass=$WP_USER_PASSWORD \
        --role=$WP_ROLE
fi;

wp --allow-root --path="/var/www/html/" theme install kubio --activate 


wp --allow-root --path="/var/www/html/" plugin install redis-cache --activate || true

if wp --allow-root --path="/var/www/html/" plugin is-active redis-cache; then
    wp --allow-root --path="/var/www/html/" redis enable || true
fi

exec $@
