
FROM debian:bullseye

EXPOSE 443

ARG CERT_FOLDER CERTIFICATE KEY COUNTRY STATE LOCALITY ORGANIZATION UNIT COMMON_NAME

RUN apt update && apt install -y --no-install-recommends --no-install-suggests \
    nginx \
    openssl && \
    rm -rf /var/lib/apt/lists/* && \
    mkdir -p ${CERT_FOLDER} && \
    openssl req -newkey rsa:4096 -x509 -sha256 -days 365 -nodes \
        -out ${CERTIFICATE} \
        -keyout ${KEY} \
        -subj "/C=${COUNTRY}/ST=${STATE}/L=${LOCALITY}/O=${ORGANIZATION}/OU=${UNIT}/CN=${COMMON_NAME}" && \
    mkdir -p /var/www/html && \
    chown -R www-data:www-data /var/www/html

COPY conf/default.conf /etc/nginx/conf.d/

RUN echo "\tserver name ${COMMON_NAME};\n\
        \tssl_certificate ${CERTIFICATE};\n\
        \tssl_certificate_key ${KEY};\n\
        }" >> /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]